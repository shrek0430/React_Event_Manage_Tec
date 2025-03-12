export const Placeholder = (field)=>{
    return `Enter ${field?.toLowerCase()}`;
}
export const Check = {
    require: (field) => `${field.toLowerCase()} is required `,
    CheckValid: (field) => `${field.toLowerCase()} should be in invalid`,
}