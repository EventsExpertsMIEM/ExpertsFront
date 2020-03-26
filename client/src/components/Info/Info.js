/* eslint-disable react/prop-types, react/destructuring-assignment, no-unused-vars */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuestions, getUserLoginStatus } from '../../actions';
import { formatDetailedDateTime } from '../helpers/helpers';

const Info = (props) => {
  const questions = useSelector((store) => store.questions);
  const dispatch = useDispatch();
  // eslint-disable-next-line react/destructuring-assignment
  const question = props.location
    && props.location.state
    ? props.location.state : questions[props.match.params.id];

  const {
    closed,
    only_experts_answer: onlyExpertsAnswer,
    only_chosen_tags: onlyChosenTags,
    id,
    u_id: userId,
    email,
    title,
    body,
    creation_date: creationDate,
    score,
    view_count: viewCount,
    comment_count: commentCount,
    tags,
  } = question;

  useEffect(() => {
    dispatch(getUserLoginStatus());
    dispatch(getAllQuestions());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="card mb-3 mt-3">
        <div className="card-header">
          {email}
        </div>
        <div className="card-body">
          <div className="form-group">
            <h2 className="card-title">{title}</h2>
            <p className="card-text">
              {body}
            </p>
            <p>Прикрепленные файлы:</p>
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12">
                <img src={`${process.env.PUBLIC_URL}/bot1.jpeg`} className="img-fluid" alt="bot 1" />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <img src={`${process.env.PUBLIC_URL}/bot2.jpeg`} className="img-fluid" alt="bot 2" />
              </div>
            </div>

          </div>
        </div>
        <div className="card-footer">
          <div className="row">

            <div className="col-lg-10 col-md-10 col-sm-10 text-center">
              <Link to="/" href="/" className="badge badge-primary">Робототехника</Link>
              <Link to="/" href="/" className="badge badge-primary">Программирование МК</Link>
              <Link to="/" href="/" className="badge badge-primary">Искуственный интеллект</Link>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 text-muted text-center">
              {formatDetailedDateTime(creationDate)}
            </div>
          </div>
        </div>
      </div>
      <form>
        <div className="form-group">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="commentTextarea"><h4>Текст комментария</h4></label>
          <textarea className="form-control" id="commentTextarea" rows="3" required />
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-8">
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="commentControlFile">Загрузка файла</label>
              <input type="file" className="form-control-file" id="commentControlFile" />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4">
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Отправить комментарий</button>
            </div>
          </div>
        </div>
      </form>
      <div className="media">
        <img src={`${process.env.PUBLIC_URL}/favicon.ico`} className="mr-3" alt="..." />
        <div className="media-body">
          <h5 className="mt-0">expertname</h5>
          Дорогой коллега, смею предложить свою экспертную оценку,
          изложенную в статье по данной ссылке:
          <Link
            to="/"
            href="/"
          >
            https://мойсайт.рф/нужнаястатья
          </Link>
          <div className="media mt-3 mb-3">
            <Link className="mr-3" to="/" href="/">
              <img src={`${process.env.PUBLIC_URL}/favicon.ico`} className="mr-3" alt="..." />
            </Link>
            <div className="media-body">
              <h5 className="mt-0">expertname</h5>
              Дорогой коллега, смею предложить свою экспертную оценку, изложенную в статье по данной
              ссылке:
              <Link to="/" href="/">https://мойсайт.рф/нужнаястатья</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
