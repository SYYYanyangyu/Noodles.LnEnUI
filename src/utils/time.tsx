//封装一个函数:获取一个结果:当前早上|上午|下午|晚上
export const getTime = () => {
  let message = ''
  //通过内置构造函数Date
  const hours = new Date().getHours()
  //情况的判断
  if (hours <= 9) {
    message = '早上'
  } else if (hours <= 12) {
    message = '上午'
  } else if (hours <= 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}

export function formatAudioDuration(seconds: number | undefined) {
  if (typeof seconds === "undefined") {
    return "--:--";
  }
  if (isNaN(seconds)) {
    return "00:00";
  }
  const pad0 = (num: number) => {
    return num < 10 ? "0" + num : "" + num;
  };

  const min = Math.trunc(seconds / 60);
  const sec = Math.trunc(seconds - min * 60);
  const hours = Math.trunc(min / 60);
  const minAdjust = Math.trunc(
    seconds / 60 - 60 * Math.trunc(seconds / 60 / 60)
  );
  return seconds >= 3600
    ? pad0(hours) + ":" + pad0(minAdjust) + ":" + pad0(sec)
    : pad0(min) + ":" + pad0(sec);
}
