/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as adminBootstrap from "../adminBootstrap.js";
import type * as appearances from "../appearances.js";
import type * as auth from "../auth.js";
import type * as authGuards from "../authGuards.js";
import type * as devBypass from "../devBypass.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as images from "../images.js";
import type * as seed from "../seed.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  adminBootstrap: typeof adminBootstrap;
  appearances: typeof appearances;
  auth: typeof auth;
  authGuards: typeof authGuards;
  devBypass: typeof devBypass;
  files: typeof files;
  http: typeof http;
  images: typeof images;
  seed: typeof seed;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
