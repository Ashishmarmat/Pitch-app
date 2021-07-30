import AsyncStorage from '@react-native-community/async-storage';
const API = {
  AUTH:
    'eyJ1c2VyX2lkIjoiODMiLCJ0b2tlbiI6IjYwNDIxMGIxNGVhOTYiLCJzdGF0dXMiOiJBY3RpdmUifQ==',
  BASE: 'http://3.140.234.233/pitch/apiV1',
  MSG: 'http://3.140.234.233:4000/api/v1',
};

var abc = '';
export function tokenAuth(token) {
  if (token) {
    abc = token;
  } else {
  }
}

// console.log("abc",abc)

function secureFetch(type, body = '') {
  if (type === 'GET' || type === 'DELETE') {
    return {
      method: type,
      headers: {
        Authorization: abc,
        version: '1',
        device_type: 'moblie',
      },
    };
  } else {
    return {
      method: type,
      headers: {
        Authorization: abc,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        version: '1',
        device_type: 'moblie',
        device_id: '',
      },
      body: JSON.stringify(body),
    };
  }
}

export function securePostForget(path, token ,body) {
  +console.log('Called');
  const secureFetchAuthNew = (type, bodyNew = '') => {
    return {
      method: type,
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        version: '1',
      },
      body: bodyNew,
    };
  };

  return fetch(`${API.BASE}/${path}`, secureFetchAuthNew('POST', body)).then(
    res => {
      return res.json();
    },
  );
}

export function securePostFormData(path, body) {
  const secureFetchNew = (type, bodyNew = '') => {
    return {
      method: type,
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        version: '1',
        device_type: 'moblie',
        device_id: '',
        profile_file: 'profile_file',
      },
      body: bodyNew,
    };
  };

  return fetch(`${API.BASE}/${path}`, secureFetchNew('POST', body)).then(
    res => {
      console.log('signup res', res);
      return res.json();
    },
  );
}

export function secureFcmFormData(path, fcmToken, body) {
  console.log('fcmToken header', fcmToken);
  const secureFcmFetchNew = (type, bodyNew = '') => {
    return {
      method: type,
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        version: '1',
        device_type: 'moblie',
        device_id: fcmToken,
        profile_file: 'profile_file',
      },
      body: bodyNew,
    };
  };

  return fetch(`${API.BASE}/${path}`, secureFcmFetchNew('POST', body)).then(
    res => {
      console.log('signup res', res);
      return res.json();
    },
  );
}

export function secureUploadProfile(path, body) {
  // console.log("abc", abc)
  const secureUploadnew = (type, bodyNew = '') => {
    return {
      method: type,
      headers: {
        Authorization: abc,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        version: '1',
        device_type: 'moblie',
        device_id: '',
        profile_file: 'profile_file',
      },
      body: bodyNew,
    };
  };

  return fetch(`${API.BASE}/${path}`, secureUploadnew('POST', body)).then(
    res => {
      console.log('signup res', res);
      return res.json();
    },
  );
}

export function SecuremessagePost(path, body) {
  const secureMessage = (type, bodyNew = '') => {
    console.log('type', type);
    return {
      method: type,
      headers: {
        Authorization: abc,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        version: '1',
        device_type: 'moblie',
      },
      body: bodyNew,
    };
  };

  return fetch(`${API.MSG}/${path}`, secureMessage('POST', body)).then(res => {
    console.log('signup res', res);
    return res.json();
  });
}

export function securePostHeader(path) {
  console.log('Called');
  const securePostHeaderNew = (type, bodyNew = '') => {
    return {
      method: type,
      headers: {
        Authorization: abc,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        version: '1',
      },
      body: bodyNew,
    };
  };

  return fetch(`${API.BASE}/${path}`, securePostHeaderNew('GET', body)).then(
    console.log('res securePostHeader', res),
    res => {
      return res.json();
    },
  );
}

export function securePostAuthFormData(path, body) {
  +console.log('Called');
  const secureFetchAuthNew = (type, bodyNew = '') => {
    return {
      method: type,
      headers: {
        Authorization: abc,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        version: '1',
      },
      body: bodyNew,
    };
  };

  return fetch(`${API.BASE}/${path}`, secureFetchAuthNew('POST', body)).then(
    res => {
      return res.json();
    },
  );
}

export function secureGetAuthFormData(path, body) {
  // console.log("abc",abc)
  // console.log("path",path)
  const secureFetchAuthNew = type => {
    return {
      method: type,
      headers: {
        Authorization: abc,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        version: '1',
      },
      // body: bodyNew,
    };
  };

  return fetch(`${API.BASE}/${path}`, secureFetchAuthNew('GET')).then(res => {
    // console.log('res@@@####',res);
    return res.json();
  });
}

export function securePost(path, body) {
  console.log('securePost body', body);
  return fetch(`${API.BASE}/${path}`, secureFetch('POST', body)).then(res => {
    console.log('securePost res', res);
    return res.json();
  });
}

export function securePut(path, body) {
  return fetch(`${API.BASE}/${path}`, secureFetch('PUT', body)).then(res =>
    res.json(),
  );
}

export function secureGet(path) {
  return fetch(`${API.BASE}/${path}`, secureFetch('GET')).then(res => {
    console.log('res@@@', res);

    return res.json();
  });
}

export function secureDelete(path) {
  return fetch(`${API.BASE}/${path}`, secureFetch('DELETE')).then(res =>
    res.json(),
  );
}
