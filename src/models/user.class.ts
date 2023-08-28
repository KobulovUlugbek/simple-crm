export class User{
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    street: string;
    zipCode: number;
    city: string;


    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.birthDate = obj ? new Date(obj.birthDate) : new Date();
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';   
    }

    public toJSON(){
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            birthDate: this.birthDate.getTime(),
            street: this.street,
            zipCode: this.zipCode,
            city: this.city
        }
    }
    public getFormattedBirthDate() {
        const day = this.birthDate.getDate().toString().padStart(2, '0');
        const month = (this.birthDate.getMonth() + 1).toString().padStart(2, '0');
        const year = this.birthDate.getFullYear();
        return `${day}.${month}.${year}`;
    }
}