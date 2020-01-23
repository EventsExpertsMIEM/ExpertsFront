import React from "react";
import {postEvent} from "../../actions";
import {useDispatch, useSelector} from "react-redux";
import {Field, reduxForm, reset} from "redux-form";

const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Неверный формат email адреса' : undefined;

const required = value => value ? undefined : 'Обязательное поле';

const INPUT_FIELDS = [
    {name: 'theme', placeholder: 'Тема вопроса', validate: required, type: 'input'},
    {name: 'text', placeholder: 'Текст вопрсоа', validate: required, type: 'textarea'},
];

const inputField = ({input, meta: {touched, error}, name, ...props}) =>
    <div className="form-group">
        <input {...input} autoComplete={name} className="form-control" form="questionCreation" {...props} />
        {error && touched && <p className="text-danger">{error}</p>}
    </div>;

const Experts = (props) => {
    const {pristine, submitting, invalid} = props;
    const dispatch = useDispatch();
    const postData = useSelector(store => store.form.questionCreation && store.form.questionCreation.values);
    const onClick = (e) => {
        e.preventDefault();
        dispatch(postEvent(postData));
        dispatch(reset('questionCreation'));
        alert(`Отправлены данные: ${JSON.stringify(postData)}`)
    };
    return (
        <div id="questions-tab">
            <form>
                <p>Новый вопрос экспертам</p>
                {INPUT_FIELDS.map((input, idx) =>
                    (<div className="form-group" key={input.placeholder}>
                            {React.createElement(input.type, {
                                className: "form-control",
                                placeholder: input.placeholder,
                                rows: "5"
                            })}
                        </div>
                    ))}

                <div className="form-group">
                    <label htmlFor="questionInputFiles">Прикрепить файлы</label>
                    <input type="file" className="form-control-file" id="questionInputFiles" multiple />
                </div>
                <div className="form-group">
                    <label htmlFor="form-autocomplete">Теги</label>
                    <input type="search" id="form-autocomplete" className="form-control mdb-autocomplete" />
                </div>
                <div className="form-group text-center">
                    <input type="submit" className="btn btn-seconadary" value="Сохранить" onClick={onClick}
                           disabled={pristine || submitting || invalid} />
                </div>
            </form>
        </div>);
};

export default reduxForm({
    form: 'questionCreation',
    initialValues: INPUT_FIELDS,
})(Experts);
