import { Enforcer } from 'casbin';

declare module 'egg' {
  interface ZroleConfig {
    /**
     * If you need to use adapter instead of policy file
     * Make it to true, then you also need to config adapterConfig method
     */
    useAdapter?: boolean;
    /**
     * If you need Anonymous role
     * that you can set some permission that all people can 
     * Make it to true
     */
    useAnonymous?: boolean;
    /**
     * If you need init policy, before your project start
     * Make it to true, then you also need to config initPolicy method
     */
    usePolicyInit?: boolean;
    /**
     * If you need make the response that response someone has no permisson by yourself
     * Make it to true, then you alse need to config customResponse method
     */
    useCustomResponse?: boolean;
    /**
     * Casbin model config file path
     */
    model: string;
    /**
     * Casbin policy config file path
     */
    policy?: string;
    /**
     * If you don't want to zrole auto add the middleware, make it to false
     */
    useAutoMiddleware?: boolean;
    /**
     * If you want to set a super manage role to jump role check
     */
    useSuperManage?: string;
    /**
     * Config adapter instead of policy file
     */
    adapterConfig(): object;
    /**
     * Use it to setting how to get user role
     * If not set, it will use default method to get user
     * @param {object} ctx Egg context
     */
    getUser(ctx: object): string;
    /**
     * If you need init policy, before your project start
     * @param {object} ctx Egg context
     */
    initPolicy(ctx: object): void;
    /**
     * Config it to response someone has no permisson by yourself
     * @param {object} ctx Egg context
     */
    customResponse(ctx: object): void;
  }
  interface Application {
    zrole: Enforcer;
  }
  interface EggAppConfig {
    zrole: ZroleConfig;
  }
}
