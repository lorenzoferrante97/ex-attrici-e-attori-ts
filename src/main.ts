// start code

// const getActress = () => {};

const getActress = <T>(id: number): T | null => {
  console.log('id into function: ', id);
  return null;
};

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

const foundActress: Actress | null = getActress(1);
console.log(foundActress);
