export const Placeholder = (field)=>{
    return `Enter ${field?.toLowerCase()}`;
}
export const Check = {
    require: (field) => `${field.toLowerCase()} is required `,
    CheckValid: (field) => `${field.toLowerCase()} should be in invalid`,
    CheckPassword:(field,digit) => `${field.toLowerCase()} must be at least ${digit} Characters`,
    match:(field) => `${field.toLowerCase()} must match` ,
    update:(field) => `${field.toLowerCase()} update Successfully`,
    reset:(field) => `${field.toLowerCase()} reset Successfully`,
}