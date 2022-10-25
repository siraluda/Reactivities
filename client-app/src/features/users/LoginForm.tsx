import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";

const LoginForm = () => {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .catch((error) => setErrors({ error: "Invalid email or password" }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form onSubmit={handleSubmit} autoComplete="off" className="ui form">
          <Header as="h2" content="Login to Reactivities" color="teal" textAlign="center" />
          <MyTextInput placeholder="Email" name="email" />
          <MyTextInput placeholder="Password" name="password" type="password" />
          <ErrorMessage
          name="error"
          render={() => <Label style={{marginBottom: 10}} basic color='red' content={errors.error}/>}/>
          <Button
            loading={isSubmitting}
            content="Login"
            type="submit"
            positive
            fluid
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(LoginForm);
