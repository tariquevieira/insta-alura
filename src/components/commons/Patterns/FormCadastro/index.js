import React from 'react';
import { Box } from '../../../foundation/layout/Box';
import { Grid } from '../../../foundation/layout/Grid';
import Text from '../../../foundation/Text';
import { Button } from '../../Button';
import TextFields from '../../Forms/TextFields';
import { Lottie } from '@crello/react-lottie';
import successAnimation from './animations/success.json';
import errorAnimation from './animations/error.json';
import { stubFalse } from 'lodash';

const formStates = {
  DEFAULT: 'DEFAULT',
  LOADING: 'LOADING',
  DONE: 'DONE',
  ERROR: 'ERROR',
};
function FormContent() {
  const [isFormSubmited, setIsFormSubmited] = React.useState(false);
  const [submissionStatus, setSubmissionStatus] = React.useState(
    formStates.DEFAULT
  );
  const [userInfo, setUserInfo] = React.useState({
    usuario: '',
    nome: '',
  });
  function handleChange(event) {
    const fieldName = event.target.getAttribute('name');
    setUserInfo({
      ...userInfo,
      [fieldName]: event.target.value,
    });
  }
  const isFormInvalid =
    userInfo.usuario.length === 0 || userInfo.nome.length === 0;
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setIsFormSubmited(true);
        console.log('O formulário esta pronto para ser evniado');
        const userDTO = {
          username: userInfo.usuario,
          name: userInfo.nome,
        };
        console.log(userDTO);
        fetch('https://instalura-api.vercel.app/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDTO),
        })
          .then((respostaDoServidor) => {
            if (respostaDoServidor.ok) {
              //console.log(respostaDoServidor);
              return respostaDoServidor.json();
            }
            throw new Error('Não foi possível cadastrar o usuário agora');
          })
          .then((respostaConvertidaEmObjeto) => {
            setSubmissionStatus(formStates.DONE);
            console.log(respostaConvertidaEmObjeto);
          })
          .catch((error) => {
            setSubmissionStatus(formStates.ERROR);
            console.error(error);
          });
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
          name="nome"
          placeholder="Nome"
          value={userInfo.nome}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextFields
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
      {isFormSubmited && submissionStatus === formStates.DONE && (
        <Box>
          <Lottie
            width="150px"
            height="150px"
            config={{
              animationData: successAnimation,
              loop: false,
              autoplay: true,
            }}
          />
          <p>Usuário cadastrado!! :)</p>
        </Box>
      )}
      {isFormSubmited && submissionStatus === formStates.ERROR && (
        <Box>
          <Lottie
            width="150px"
            height="150px"
            config={{
              animationData: errorAnimation,
              loop: false,
              autoplay: true,
            }}
          />
          <p>Infelizmente não foi possivel cadastrar seu usuário!!:(</p>
        </Box>
      )}
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
