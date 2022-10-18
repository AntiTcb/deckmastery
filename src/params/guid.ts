import type { ParamMatcher } from "@sveltejs/kit";
export const match: ParamMatcher = (param: string) => /^[\da-zA-Z]{8}-([\da-zA-Z]{4}-){3}[\da-zA-Z]{12}$/.test(param);
