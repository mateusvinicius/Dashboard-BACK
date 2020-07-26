import { ValidatorParam, getMetaValidate, ValidatorMeta } from './metaValidetor';

function decoratorFactory(type:ValidatorParam) {
  return function (target: any, propertyKey:string):void {
    const meta:Array<ValidatorMeta> = getMetaValidate(target);
    meta.push({ target, propertyKey });
  };
}

export const isEmail = decoratorFactory(ValidatorParam.ISEMAIL);
