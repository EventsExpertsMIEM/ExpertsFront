import React from 'react';

const CreateArticle = () => (
  <div className="container">
    <form className="mt-3">
      <h3>Новый вопрос экспертам</h3>
      <div className="form-group">
        <input type="text" className="form-control" id="articleTitle" placeholder="Тема статьи" required />
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          id="articleText"
          rows="30"
          placeholder="Текст статьи"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="search"
          className="form-control mdb-autocomplete"
          id="eventTags"
          placeholder="Научные области (теги)"
          required
        />
      </div>
      <div className="form-group text-center">
        <button type="submit" className="btn btn-secondary">Отправить</button>
      </div>
    </form>

  </div>
);

export default CreateArticle;
