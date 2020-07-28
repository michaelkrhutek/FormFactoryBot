import fetch from 'node-fetch';
import FormData from 'form-data';

async function getAuthentificationCookie(userCredentials: IUserCredentials): Promise<string | null> {
    const formData: FormData = new FormData();
    formData.append('Login', userCredentials.username);
    formData.append('Password', userCredentials.password);
    formData.append('SubmitCredentials', 'Přihlášení');
    const res = await fetch('https://vinohradska.formfactory.cz/Login/LoginForm2', {
        method: 'POST',
        body: formData
    });
    return res.headers.get('set-cookie');
}

export default getAuthentificationCookie;