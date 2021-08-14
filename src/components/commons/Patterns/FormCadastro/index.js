import React from 'react';
import { Box } from '../../../foundation/layout/Box';
import { Grid } from '../../../foundation/layout/Grid';
import Text from '../../../foundation/Text';
import { Button } from '../../Button';
import TextFields from '../../Forms/TextFields';

function FormContent() {
  const [userInfo, setUserInfo] = React.useState({
    usuario: 'tariquevieira',
    email: 'tariquevieira@gmail.com',
  });
  function handleChange(event) {
    const fieldName = event.target.getAttribute('name');
    setUserInfo({
      ...userInfo,
      [fieldName]: event.target.value,
    });
  }
  const isFormInvalid =
    userInfo.usuario.length === 0 || userInfo.email.length === 0;
  return (
    <form
      onSubmit={(event) => {
        event.prenventDefault();
        console.log('O formulário esta pronto para ser evniado');
      }}
    >
      <Text variant="title" tag="h1" color="tertiary.main">
        Pronto para saber da vida dos outros?
      </Text>
      <Text
        variant="paragraph1"
        tag="p"
        color="tertiary.light"
        marginBottom="32px"
      >
        Você está a um passo de saber tudo o que está rolando no bairro,
        complete seu cadastro agora!
      </Text>

      <div>
        <TextFields
          type="email"
          name="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextFields
          type="text"
          name="usuario"
          placeholder="Usuario"
          value={userInfo.usuario}
          onChange={handleChange}
        />
      </div>
      <Button
        type="submit"
        disabled={isFormInvalid}
        variant="primary.main"
        fullWidth={true}
      >
        Cadastrar
      </Button>
    </form>
  );
}

export default function FormCadastro({ propsDoModal }) {
  return (
    <Grid.Row marginLeft={0} marginRight={0} flex={1} justifyContent="flex-end">
      <Grid.Col
        display="flex"
        paddingRight={{ md: '0' }}
        flex={1}
        value={{ xs: 12, md: 5, lg: 4 }}
      >
        <Box
          boxShadow="-10px 0px 24px rgba(7, 12, 14, 0.1)"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          flex={1}
          padding={{
            xs: '16px',
            md: '85px',
          }}
          backgroundColor="white"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...propsDoModal}
        >
          <FormContent />
        </Box>
      </Grid.Col>
    </Grid.Row>
  );
}
