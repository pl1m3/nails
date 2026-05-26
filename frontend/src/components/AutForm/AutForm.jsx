import { useState } from "react"
import { Link } from "react-router-dom"
import "./AutForm.css"
import { fetchAut } from "../../../fetch/fetchAut"
import { useNavigate } from "react-router-dom"

function AutForm() {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
    const navigate = useNavigate()

    const handleLogin = (e) => { setLogin(e.target.value) }
    const handlePassword = (e) => { setPassword(e.target.value) }

    const submitForm = async (e) => {
        e.preventDefault();
        setErr('');

        if (!login || !password) {
            return setErr("Все поля должны быть заполнены");
        }

        const result = await fetchAut({ login, password });

        if (result.success && result.user) {
            localStorage.setItem('user', JSON.stringify(result.user));

            if (result.user.id_role === 2) {
                console.log("Вы администратор");
                return navigate('/admin');
            }
            navigate('/pa');
        } else {
            setErr(result.error || "Неверный логин или пароль");
        }
    }
    return (
        <div className="autFormFull">
            <h2>Авторизация</h2>
            <form action="" className="fullInput" onSubmit={submitForm}>

                {err && <span className="err">{err}</span>}
                <div className="input">
                    <label htmlFor="">Логин</label>
                    <input type="text" value={login} onChange={handleLogin} />
                </div>

                <div className="input">
                    <label htmlFor="">Пароль</label>
                    <input type="password" value={password} onChange={handlePassword} />
                </div>

                <button type="submit" className="buttonAut">Войти</button>
                <Link to={'/reg'} >Перейти к регистрации</Link>
            </form>
        </div>
    )
}

export default AutForm