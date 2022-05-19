import { Injectable } from '@nestjs/common';
import { Filter } from '@nestjs-query/core';
import { UserContext } from '../auth/auth.interfaces';
import { TradeinDto } from './dto/tradein.dto';
import { CustomAuthorizer } from '@nestjs-query/query-graphql';

@Injectable()
export class TradeinAuthorizer implements CustomAuthorizer<TradeinDto> {
  authorize(context: UserContext): Promise<Filter<TradeinDto>> {
    console.log(context.req.user);
    if (context.req.user.role.shortname === 'verifier') {
      console.log('verifier');
      // return Promise.resolve({
      //   or: [
      //     {
      //       suggestedPartnerId: { eq: context.req.user.partnerId },
      //     },
      //     {
      //       verifierPartnerId: { eq: context.req.user.partnerId },
      //     },
      //   ],
      // });
      return Promise.resolve({
        verifierPartnerId: { eq: context.req.user.partnerId },
      });
    }
    return Promise.resolve({});
  }

  // authorizeRelation(
  //   relationName: string,
  //   context: UserContext,
  // ): Promise<Filter<unknown> | undefined> {
  //   if (relationName === 'suggestedPartners') {
  //     return Promise.resolve({
  //       or: [
  //         {
  //           suggestedPartnerId: { eq: context.req.user.partnerId },
  //         },
  //         {
  //           verifierPartnerId: { eq: context.req.user.partnerId },
  //         },
  //       ],
  //     });
  //   }
  //   return Promise.resolve(undefined);
  // }
}
