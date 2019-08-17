import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { IncomingMessage } from "http";
import { FastifyRequest } from "fastify";
import { config } from "../Config";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: FastifyRequest<
      IncomingMessage
    > = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}

/**
 * Check that an api key has been provided in the
 * x-api-key header and that it matches the app's config
 * @param request API request
 */
async function validateRequest(
  request: FastifyRequest<IncomingMessage>,
): Promise<boolean> {
  const apiKey = request.headers["x-api-key"];

  if (apiKey == undefined) {
    throw new HttpException(
      "An x-api-key header is required for this resource",
      HttpStatus.UNAUTHORIZED,
    );
  }

  if (apiKey !== config.apiKey) {
    throw new HttpException("Invalid API key", HttpStatus.FORBIDDEN);
  }

  return true;
}
