/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { string, func, arrayOf, shape, number } from 'prop-types';
import { nanoid } from 'nanoid';

import DeleteButton from '../Button';
import appendState from '../../helpers/Helpers';

const TextEdit = ({ content, description }) => {
  const [text, setText] = useState(content);
  return (
    <div className="input-group input-group-sm mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-sm">
          {description}
        </span>
      </div>
      <input
        type="text"
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </div>
  );
};

TextEdit.propTypes = {
  content: string,
  description: string.isRequired
};

TextEdit.defaultProps = {
  content: ''
};

const ImageUpload = ({ onChange }) => {
  const [imageUploadLabel, setImageUploadLabel] = useState('Image');
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target.files[0].name);
        }}
      >
        <div className="input-group mb-3">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="imageUpload"
              aria-describedby="imageUploadAddon"
              onChange={(e) => {
                setImageUploadLabel(e.target.files[0].name);
                onChange(e.target.files[0]);
              }}
            />
            <label className="custom-file-label" htmlFor="imageUpload">
              {imageUploadLabel}
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

ImageUpload.propTypes = {
  onChange: func.isRequired
};

const EditorCard = ({ id, imageURL, title, text, onChange }) => {
  return (
    <div className="col my-2">
      <div className="card mx-2">
        <div className="card-header">
          <div className="d-flex justify-content-between">
            Card {id} <DeleteButton element={title} onClick={() => console.log('hey')} />
          </div>
        </div>
        <div className="row no-gutters">
          {imageURL && (
            <div className="col-4 align-self-center">
              <img src={imageURL} className={imageURL} alt="..." style={{ maxWidth: '100%' }} />
            </div>
          )}
          <div className="col">
            <div className="card-body">
              <TextEdit content={title} description="Title" />

              <TextEdit content={text} description="Text" />
            </div>
          </div>
        </div>
        {imageURL ? (
          <button type="button" className="btn btn-warning">
            Remove image
          </button>
        ) : (
          <div className="row no-gutters">
            <div className="col mx-3">
              <ImageUpload onChange={onChange} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

EditorCard.propTypes = {
  id: number.isRequired,
  imageURL: string,
  title: string.isRequired,
  text: string.isRequired,
  onChange: func.isRequired
};

const AmountCardsGrid = ({ answers, onChange }) => {
  return (
    <div className="row no-gutters row-cols-1 row-cols-md-2">
      {answers.map((answer, index) => (
        <EditorCard
          key={answer.key}
          id={index + 1}
          imageURL={answer.imageURL}
          title={answer.title}
          text={answer.subtitle}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

AmountCardsGrid.propTypes = {
  answers: arrayOf(
    shape({
      key: string.isRequired,
      title: string,
      subtitle: string,
      imageURL: string
    })
  ).isRequired,
  onChange: func.isRequired
};

EditorCard.defaultProps = {
  imageURL: ''
};

const CardsEditor = ({ answers, onChange }) => {
  const [cards, setCards] = useState(answers.options);

  useEffect(() => {
    const answerOptions = {
      type: answers.type,
      options: cards
    };
    onChange(answerOptions);
  }, [cards]);

  const removeCard = (cardToRemove) => {
    setCards(cards.filter((card) => card !== cardToRemove));
  };

  const [image, setImage] = useState();
  return (
    <div>
      <div className="border border-success text-center">
        <button
          type="button"
          className="btn btn-outline-primary mt-3"
          onClick={() => {
            const newCard = { key: nanoid(), title: '', subtitle: '', imageURL: '' };
            appendState(newCard, cards, setCards);
          }}
        >
          Add New Amount Card
        </button>
      </div>
      <div className="border border-danger">
        <AmountCardsGrid answers={cards} onChange={onChange} />
      </div>
    </div>
  );
};

CardsEditor.propTypes = {
  answers: shape({
    type: string,
    options: arrayOf(
      shape({
        key: string.isRequired,
        title: string,
        subtitle: string,
        imageURL: string
      })
    )
  }).isRequired,
  onChange: func.isRequired
};

export default CardsEditor;
