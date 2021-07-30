import {Platform, Dimensions} from 'react-native';

class Validators {
  static validEmail(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  }

  static validPassword(password) {
    if (password.length < 8) {
      return false;
    }
    return true;
  }

  static validLowerCase(str) {
    return /[a-z]/.test(str);
  }

  static validUpperCase(str) {
    console.log('str', str);
    return /([A-Z]+)/g.test(str);
  }

  static validNumber(str) {
    return /\d/.test(str);
  }

  static validSpecialCharacter(value) {
    const flag = /[@#$-/:-?{-~!"^_`[\]]/;
    return flag.test(value);
  }

  static validPhoneNumber(number) {
    const re = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/gm;
    if (!re.test(number)) {
      return false;
    }
    return true;
  }

  static validMobileNumber(number) {
    if (number.length !== 10) {
      return true;
    }
    return false;
  }

  static isEmpty(name) {
    if (name && name.trim() !== '') {
      return false;
    }
    return true;
  }

  static onlyAlphabets(value) {
    const flag = /[^0-9\s]|^\S+$]/;
    return flag.test(value);
  }

  static isValidPassword(value) {
    // Password must contain one uppercase letter, one lower case letter, one special symbol, and in range of 4 - 8 char long.
    const flag = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
    return flag.test(value);
  }

  static platform() {
    let platform;
    if (Platform.OS === 'ios') {
      platform = 'ios';
    } else {
      platform = 'android';
    }
    return platform;
  }

  static isIphoneX = () => {
    const {height, width} = Dimensions.get('window');

    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (height === 812 || width === 812 || height === 896 || width === 896)
    );
  };

  static isPitchPassword = value => {
    // Password must contain one uppercase letter, one lower case letter, one special symbol,
    //one number and atleast 8 char long.
    const flag = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,}$/;
    return flag.test(value);
  };
}

export default Validators;
