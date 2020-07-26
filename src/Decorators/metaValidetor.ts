export interface ValidatorClass{
    // eslint-disable-next-line camelcase
    __validator_meta__?:Array<ValidatorMeta>;
}

export interface ValidatorMeta{
  target: ValidatorClass |any;
  propertyKey:string;

}

export function getMetaValidate(target:ValidatorClass): Array<ValidatorMeta> {
  if (!target.__validator_meta__) {
    // eslint-disable-next-line no-param-reassign
    target.__validator_meta__ = [];
  }
  return target.__validator_meta__;
}

export enum ValidatorParam {
    ISEMAIL,
}
