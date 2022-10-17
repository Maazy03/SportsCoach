import validators from '@components/utils/Validators';

function FormValidation(data) {
  let errorArr = [];

  for (let key in data) {
    if (data[key] === '') {
      errorArr.push(key);
    }
  }
  if (errorArr?.length > 0) {
    let error = {
      errorArr,
      message: 'An error has occured, check your details!',
    };
    return error;
  }

  if (
    data?.email &&
    !validators.emailREX.test(String(data?.email).toLowerCase())
  ) {
    errorArr.push('email');
    let error = {
      errorArr,
      message: 'An error has occured, email not valid',
    };
    return error;
  }

  if (data?.phoneNumber && isNaN(data?.phoneNumber)) {
    errorArr.push('phoneNumber');
    let error = {
      errorArr,
      message: 'An error has occured, number should be in digits',
    };
    return error;
  }

  if (data?.password && data?.password?.length < 8) {
    errorArr.push('password');
    let error = {
      errorArr,
      message:
        'An error has occured, password should be greater than 8 characters',
    };
    return error;
  }

  if (data?.focusTags && data?.focusTags?.length < 8) {
    errorArr.push('focusTags');
    let error = {
      errorArr,
      message: 'An error has occured, focusTags should be selected',
    };
    return error;
  }
}
export default FormValidation;
