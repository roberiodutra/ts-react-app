import { QuestionType } from "../../types/QuestionType";

const copies = (obj: QuestionType) => {
  const objs = [];
  for (let i = 0; i < 20; i += 1) {
    objs.push({ ...obj, _id: i });
  }
  return objs;
};

const questionMock = {
  questions: [
    {
      _id: "6355sadsad43431",
      userId: "635f6c84072ef987f2dc3e05",
      author: "Tester Admin",
      question: "What is React?",
      answer: "https://stacovesrflow.com/questions/61634973/",
      status: "pending",
    },
    ...copies({
      _id: "6355da1a603sf6d6sdg450c01",
      userId: "as5d6asdsdjhjh344342",
      author: "Tester Member",
      question: "What is Javascript?",
      answer: "https://stacovesrflow.com/questions/61634973/",
      status: "published",
    }),
  ],
  total: [
    {
      count: 21,
    },
  ],
};

export default questionMock;
