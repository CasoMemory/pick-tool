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
  method?: MethodEnum,
  mode?: ModeEnum,
  credentials?: CredentialsEnum
  headers?: {
    'Content-Type'?: string;
  },
  body?: string;
}

export default async (params: RequestProps) => {
  const { url, ...config } = params;
  const defaultConfig = {
    method: MethodEnum.GET,
    mode: ModeEnum.NO_CORS,
    credentials: CredentialsEnum.OMIT,
    headers: { 'Content-Type': 'application/json' }
  }

  // send fetch request
  const data = await fetch(url, {
    ...defaultConfig,
    ...config
  }).then(res => res.json());

  return data
}