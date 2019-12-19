import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding: 0 30px;
`;

export const Description = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #fff;
`;

export const Image = styled.Image`
  width: 200px;
  height: 200px;
  align-self: center;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
  padding: 10px 10px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
  margin-top: 10px;
  height: 200px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 10px;
`;
