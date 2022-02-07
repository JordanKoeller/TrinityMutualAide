
import {
  ApiGatewayEvent, AuthenticatedRequestContext, ApiGatewayResponse
} from './types';


export interface RequestMethod {
  endpoint: string,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH',
}

export type ApiHandler = (event: ApiGatewayEvent, context: AuthenticatedRequestContext) =>Promise<ApiGatewayResponse>;

export abstract class Handler {

  method: RequestMethod;

  constructor(m: RequestMethod) {
    this.method = m;
  }

  abstract handle(event: ApiGatewayEvent, context: AuthenticatedRequestContext): Promise<ApiGatewayResponse>;

  isHandler(event: ApiGatewayEvent): boolean {
    return event.requestContext.resourcePath === this.method.endpoint && event.httpMethod == this.method.method;
  }

  async getResponse(event: ApiGatewayEvent, context: AuthenticatedRequestContext): Promise<ApiGatewayResponse> {
      try {
          return await this.handle(event, context);
      } catch (err: any) {
          return this.err(JSON.stringify({message: "Unexpected Error!", errLog: err}));
      }
  }

  protected err(message: string): ApiGatewayResponse {
      return {
          statusCode: 500,
          body: JSON.stringify({message}),
      }
  } 
  protected success(message: Record<string, unknown>): ApiGatewayResponse {
    return {
        statusCode: 200,
        body: JSON.stringify(message),
    }
} 
}

export class LambdaApp {
  handlers: Handler[];

  constructor() {
    this.handlers = [];
  }

  async run(event: ApiGatewayEvent, context: AuthenticatedRequestContext): Promise<ApiGatewayResponse> {
    for (let i=0; i < this.handlers.length; i++) {
      if (this.handlers[i].isHandler(event)) {
        return this.handlers[i].getResponse(event, context);
      }
    }
    console.log("No valid handler", JSON.stringify(event));
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `No handler set up for ${event.httpMethod} ${event.path}`,
        routes: this.handlers.map(handle => handle.method),
      }),
    };
  }

  register(handler: Handler): void {
    this.handlers.push(handler);
  }


  _packageResponse(response: ApiGatewayResponse): Record<string, any> {
    return {
      ...response,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": 'http://localhost:3000',
        "Access-Control-Allow-Credentials": true
      }
    }
  }

  asFunc(): (event: ApiGatewayEvent, context: AuthenticatedRequestContext) =>Promise<any> {
    return (evt, ctx) => this.run(evt, ctx).then(resp => this._packageResponse(resp));
  }

}