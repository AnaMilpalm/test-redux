import s from './ContactForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from "yup";

const FeedbackSchema = Yup.object().shape({
  username: Yup.string().min(2, "Too shot!").max(50, "Too long!").required("Required!"), 
  usertel: Yup.string().min(7, "Too Short!").max(7, "Too long!").required("Required!"),
});

const ContactForm = ({ onAdd }) => {
  const handleSubmit = (values, { resetForm }) => {
        const newContact = {
      id: nanoid(),
      name: values.username, 
      number: values.usertel, 
    };
    onAdd(newContact);
    resetForm();
  };
  
  return (
    <Formik
      initialValues={{
        username: '', 
        usertel: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
    
      <Form className={s.form} >
        <Field className={s.field} type="text" name="username" placeholder="Name" />
        <ErrorMessage name="username" component="span" className={s.error} />
        <Field className={s.field} type="tel" name="usertel" placeholder="Phone number" />
        <ErrorMessage name="usertel" component="span" className={s.error} />
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
