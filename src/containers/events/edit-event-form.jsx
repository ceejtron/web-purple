import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { objOf, path, pipe } from 'ramda';
import { compose } from 'recompose';
import { Field, FieldArray, reduxForm } from 'redux-form';
import styled from 'styled-components';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-select/dist/react-select.css';

import DatePicker from 'react-datepicker';
import { Creatable as CreatableSelect, AsyncCreatable as AsyncCreatableSelect } from 'react-select';
import Popup from '../../components/common/popup';
import { allTagsSelector } from './events-reducer';
import { getJson } from '../../utils/ajax';

const getThemeColor = color => path(['theme', color]);
const lipstick = getThemeColor('lipstick');
const vividPurple = getThemeColor('vividPurple');

const FormInput = styled.input`
    display: block;
    border: none;
    border-bottom: 1px solid ${getThemeColor('warmGrey')};
    font-family: Oxygen, sans-serif;
    font-size: 1.8em;
    padding: .5em;
    margin: .5em;
    outline: none;
    
    &:focus {
        border-bottom-color: ${lipstick};
    }
`;

const Fieldset = styled.fieldset`
    border: 2px solid ${lipstick};
    padding: 1em 2em;
    box-sizing: border-box;
    margin-bottom: 2em;
`;

const Legend = styled.legend`
    font-size: 2em;
    padding: 0 .5em;
    font-family: Rubik, sans-serif;
    color: ${lipstick};
`;

const TalkFormInput = FormInput.extend`
    &:focus {
        border-bottom-color: ${vividPurple};
    }
`;

const TalkFieldset = Fieldset.extend`
    border-color: ${vividPurple};
`;

const TalkLegend = Legend.extend`
    color: ${vividPurple};
`;

const DatePickerField = ({ input: { value, onChange } }) => (
    <DatePicker selected={value} onChange={onChange} />
);

const TagsSelectField = ({ input: { value, onChange }, tags }) => (
    <CreatableSelect
        options={tags.map(t => ({ value: t, label: t }))}
        value={value}
        onChange={onChange}
        multi
        promptTextCreator={tag => `Create tag "${tag}"`}
        placeholder="Enter tags..." />
);

const SpeakerSelectField = ({ input: { value, onChange } }) => (
    <AsyncCreatableSelect
        value={value}
        onChange={onChange}
        loadOptions={() => getJson('/api/users').then(options => ({ options }))/* TODO: prevent multiple requests */}
        valueKey="_id"
        labelKey="displayName"
        promptTextCreator={userName => `Create user "${userName}"`}
        newOptionCreator={({ label, labelKey, valueKey }) => ({ [labelKey]: label, [valueKey]: -1 })}
        placeholder="Speaker" />
);

const AddButton = styled.button`
    border: none;
    background-color: transparent;
    color: ${vividPurple};
    font-family: Rubik, sans-serif;
    font-size: 2em;
    float: right;
    cursor: pointer;
`;

/* eslint-disable react/no-array-index-key */
const renderTalks = ({ fields: talks }) => (
    <div>
        {talks.map((talk, i) => (
            <TalkFieldset key={i}>
                <TalkLegend>Talk {i + 1}</TalkLegend>
                <Field name={`${talk}.title`} required component={TalkFormInput} placeholder="Title" />
                <Field name={`${talk}.speaker`} component={SpeakerSelectField} />
            </TalkFieldset>
        ))}
        <AddButton type="button" title="Add talk" onClick={() => talks.push({})}>+ Talk</AddButton>
    </div>
);

const EditEventForm = ({ onSubmit, handleSubmit, onRequestClose, tags }) => (
    <Popup isOpen contentLabel="Add new event" onRequestClose={onRequestClose}>
        <form
            onSubmit={handleSubmit(event => onSubmit({
                ...event,
                tags: event.tags && event.tags.map(t => t.value),
            }))}>

            <Fieldset>
                <Legend>Event</Legend>
                <Field name="title" required component={FormInput} placeholder="Title" />
                <Field name="description" required component={FormInput} placeholder="Description" />
                <Field name="image" component={FormInput} placeholder="Image url" />
                <Field name="date" component={DatePickerField} />
                <Field name="location" required component={FormInput} placeholder="Location" />
                <Field name="tags" tags={tags} component={TagsSelectField} />
            </Fieldset>

            <FieldArray name="talks" component={renderTalks} />

            <button type="submit">Submit event</button>
        </form>
    </Popup>
);

EditEventForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func,
};

export default compose(
    reduxForm({
        form: 'edit-event',
        initialValues: {
            date: moment().day('Thursday'),
        },
    }),
    connect(pipe(allTagsSelector, objOf('tags'))),
)(EditEventForm);
