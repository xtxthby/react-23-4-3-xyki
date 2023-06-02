import React, { useState, useEffect, useRef } from 'react';

const styles = {
  clockface: {
    fontSize: 64,
    fontWeight: 500,
    textAlign: 'center',
  },
};

export default function Clock() {
  const [time, setTime] = useState(new Date());
  // в intervalId лежить обєкт (curent) поточний ,
  // с початку там нічого немає
  // useRef() викликається один раз і зберігає між рендерами 
  // оде і те саме значення
  const intervalId = useRef();

  useEffect(() => {
    // сюди  (intervalId.current) ми записуємо лічильник
    intervalId.current = setInterval(() => {
      console.log('Это интервал каждые 1000ms ' + Date.now());
      setTime(new Date());
    }, 1000);
    //   тут ми повертаємо очистку, або зупинку функції після виходу 
    // з неї на іншу сторінку
    return () => {
      console.log('Эта функция вызывается перед каждым useEffect');
      stop();
    };
    // за допомогою [] один раз запуститься інтервал , а 
    // далі буде сетиться (setTime) кожну 1000 ms
  }, []);

  const stop = () => {
    clearInterval(intervalId.current);
  };

  return (
    <>
      <p style={styles.clockface}>Текущее время: {time.toLocaleTimeString()}</p>
      <button type="button" onClick={stop}>
        Stop
      </button>
    </>
  );
}

// export default class Clock extends Component {
//   state = {
//     time: new Date(),
//   };

//   intervalId = null;

//   componentDidMount() {
//     this.intervalId = setInterval(() => {
//       this.setState({ time: new Date() });
//     }, 1000);
//   }

//   componentWillUnmount() {
//     this.stop();
//   }

//   stop = () => {
//     clearInterval(this.intervalId);
//   };

//   render() {
//     return (
//       <>
//         <p style={styles.clockface}>
//           Текущее время: {this.state.time.toLocaleTimeString()}
//         </p>
//         <button type="button" onClick={this.stop}>
//           Stop
//         </button>
//       </>
//     );
//   }
// }
