import {toTypedSchema} from "@vee-validate/zod";
import * as zod from "zod";

const emailRule = toTypedSchema(zod.string().nonempty('Champ requis').email('doit être un email valide'));
const nameRule = toTypedSchema(zod.string().nonempty('Champ requis').min(3, 'Le nom doit contenir au moins 4 caractères'));
const phoneRule = toTypedSchema(zod.string().nonempty('Champ requis').min(10, 'Le numéro de téléphone doit contenir au moins 10 caractères'));
const passwordRule = toTypedSchema(zod.string().nonempty('Champ requis').min(6, 'Le mot de passe doit contenir au moins 6 caractères'));
const passwordConfirmationRule = toTypedSchema(zod.string().nonempty('Champ requis').min(6, 'Le mot de passe doit contenir au moins 6 caractères'));


export {emailRule, nameRule, phoneRule, passwordRule, passwordConfirmationRule};
