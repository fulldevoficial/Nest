export interface LoginRequest {
    email: string;
    senha: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: string;
        nome: string;
        email: string;
        // cpf e bla bla bla... confirmar na dock do back
    }
}