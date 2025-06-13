// start code

// const getActress = () => {};

// is Actress
const isActress = (actress: unknown): actress is Actress => {
  if (typeof actress === 'object' && actress !== null && 'id' in actress && 'name' in actress && 'birth_year' in actress && 'biography' in actress && 'image' in actress && 'most_famous_movies' in actress && 'awards' in actress && 'nationality' in actress) {
    return true;
  }

  return false;
};

// --------------------------------------------------------------------------------

const getActress = async <T>(id: number): Promise<T | null> => {
  const res = await fetch(`http://localhost:3333/actresses/${id}`);
  if (!res.ok) {
    throw new Error('Errore nel ricevere i dati dalla fetch');
  }

  const resJson: unknown = await res.json();
  if (!isActress(resJson)) {
    throw new Error('Dati ricevuti non rispettano il formato corretto');
  }

  return resJson as T;
};

const getAllActresses = async <T>(): Promise<T[] | null> => {
  const res = await fetch(`http://localhost:3333/actresses/`);

  if (!res.ok) {
    throw new Error('Errore nel ricevere i dati dalla fetch');
  }

  const resJson: unknown = await res.json();

  if (Array.isArray(resJson)) {
    resJson.forEach((actress) => {
      if (!isActress(actress)) {
        throw new Error('Dati ricevuti non rispettano il formato corretto');
      }
    });
  }

  return resJson as T[];
};

const getActresses = async <T>(ids: number[]): Promise<T[] | null> => {
  const res = await Promise.all(ids.map((id) => getActress(id)));
  return res as T[];
};

// --------------------------------------------------------------------------------

type Person = {
  readonly id: number;
  readonly name: string;
  birth_year: number;
  death_year?: number;
  biography: string;
  image: string;
};

type Actress = Person & {
  most_famous_movies: [string, string, string];
  awards: string;
  nationality: 'American' | 'British' | 'Australian' | 'Israeli-American' | 'South African' | 'French' | 'Indian' | 'Israeli' | 'Spanish' | 'South Korean' | 'Chinese';
};

// --------------------------------------------------------------------------------

(async () => {
  const foundActress: Actress | null = await getActress(1);
  // console.log('foundActress: ', foundActress);

  const allActresses: Actress[] | null = await getAllActresses();
  // console.log('all actresses: ', allActresses);

  const chosenActresses: Actress[] | null = await getActresses([1, 2]);
  console.log('actresses 1 & 2: ', chosenActresses);
})();
