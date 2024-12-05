import promptSync from 'prompt-sync';
const prompt = promptSync();
const BASE_URL = 'http://localhost:3000/users'; // Base URL das rotas da API

let end = false;

function escolherOpcao() {
    return prompt('O que deseja fazer?');
}

function menu() {
    console.log('Sistema de Cadastro de Usuários');
    console.log('===============================');
    console.log('Digite 1 - Cadastrar Usuário');
    console.log('Digite 2 - Verificar Usuário');
    console.log('Digite 3 - Mudar informação do Usuário');
    console.log('Digite 4 - Apagar Usuário');
    console.log('Digite 5 - Sair');
    return escolherOpcao();
}

async function case1() {
    const name = prompt('Digite o nome do usuário: ');
    const email = prompt('Digite o email do usuário: ');
    const password = prompt('Digite a senha do usuário: ');

    try {
        const response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao cadastrar usuário');
        }

        console.log('Usuário cadastrado com sucesso:', data);
    } catch (error) {
        console.log('Erro ao cadastrar usuário:', error.message);
    }
}

async function case2() {
    const email = prompt('Digite o email do usuário para verificar: ');

    try {
        const response = await fetch(`${BASE_URL}/${email}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao encontrar usuário');
        }

        console.log('Usuário encontrado:', data);
    } catch (error) {
        console.log('Erro ao encontrar usuário:', error.message);
    }
}

async function case3() {
    const email = prompt('Digite o email do usuário para modificar: ');
    const password = prompt('Digite a senha atual do usuário: ');

    try {
        // Busca o usuário na API
        const response = await fetch(`${BASE_URL}/${email}`);
        
        if (!response.ok) {
            const errorData = await response.json(); // Recupera a mensagem de erro da resposta
            throw new Error(errorData.message || 'Erro ao encontrar usuário');
        }

        const user = await response.json();

        // Verifica se a senha fornecida é correta
        if (user.password !== password) {
            console.log('Senha incorreta. A operação foi cancelada.');
            return;
        }

        // Solicita os novos dados (nome e senha)
        const newName = prompt('Digite o novo nome (ou pressione Enter para manter o atual): ');
        const newPassword = prompt('Digite a nova senha (ou pressione Enter para manter a atual): ');

        const updateData = {
            name: newName || user.name,  // Mantém o nome atual caso o novo nome não seja fornecido
            password: newPassword || user.password,  // Mantém a senha atual caso a nova senha não seja fornecida
        };

        // Envia os dados atualizados para a API
        const updateResponse = await fetch(`${BASE_URL}/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        const updateDataResponse = await updateResponse.json();

        if (!updateResponse.ok) {
            throw new Error(updateDataResponse.message || 'Erro ao atualizar usuário');
        }

        console.log('Usuário atualizado com sucesso:', updateDataResponse);
    } catch (error) {
        console.log('Erro ao modificar usuário:', error.message);
    }
}


async function case4() {
    const email = prompt('Digite o email do usuário para apagar: ');
    const password = prompt('Digite a senha do usuário para apagar: ');

    try {
        const response = await fetch(`${BASE_URL}/${email}`);
        const user = await response.json();

        if (!response.ok) {
            throw new Error(user.message || 'Erro ao encontrar usuário');
        }

        if (user.password !== password) {
            console.log('Senha incorreta. A operação foi cancelada.');
            return;
        }

        const deleteResponse = await fetch(`${BASE_URL}/${email}`, {
            method: 'DELETE',
        });

        const deleteData = await deleteResponse.json();

        if (!deleteResponse.ok) {
            throw new Error(deleteData.message || 'Erro ao apagar usuário');
        }

        console.log(deleteData.message);
    } catch (error) {
        console.log('Erro ao apagar usuário:', error.message);
    }
}

while (end === false) {
    switch (menu()) {
        case '1':
            await case1();
            break;
        case '2':
            await case2();
            break;
        case '3':
            await case3();
            break;
        case '4':
            await case4();
            break;
        case '5':
            console.log('Saindo...');
            end = true;
            break;
        default:
            console.log('Opção inválida. Tente novamente.');
    }
}
