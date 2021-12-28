enum MethodEnum {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT'
}

enum ModeEnum {
  NO_CORS = 'no-cors',
  CORS = 'cors',
  SAME_ORIGIN = 'same-origin'
}

enum CredentialsEnum {
  SAME_ORIGIN = 'same-origin',
  INCLUDE = 'include',
  OMIT = 'omit'
}

interface RequestProps {
  url: string;
  method?: MethodEnum | string,
  mode?: ModeEnum,
  credentials?: CredentialsEnum
  headers?: {
    'Content-Type'?: string;
  },
  body?: any;
}

export default async (params: RequestProps) => {
  const { url, ...config } = params;
  const defaultConfig = {
    method: MethodEnum.GET,
    mode: ModeEnum.NO_CORS,
    credentials: CredentialsEnum.OMIT,
    headers: { 'Content-Type': 'application/json' }
  }

  let values = { ...defaultConfig, ...config }

  if ('body' in values && values.body) {
    values.body = JSON.stringify(values.body)
  }

  // send fetch request
  const data = await fetch(url, values).then(res => res.json());

  return data
}