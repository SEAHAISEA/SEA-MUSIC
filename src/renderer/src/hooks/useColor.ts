type HSLToColorResult = string | [number, number, number]

export default function () {
  function hsl2rgbORhex(h: number, s: number, l: number, t:string): HSLToColorResult {
    const round: (n: number) => number = Math.round
    let r: number, g: number, b: number
    let resC: number[]

    if (s === 0) {
      r = g = b = l * 255
      resC = [round(r), round(g), round(b)]
    } else {
      let t3 = [0, 0, 0]
      let c = [0, 0, 0]
      const t2 = l < 0.5 ? l * (1 + s) : l + s - l * s
      const t1 = 2 * l - t2
      const h_ = h / 360

      t3 = [h_ + 1 / 3, h_, h_ - 1 / 3]
      for (let i = 0; i < 3; i++) {
        t3[i] = t3[i] < 0 ? t3[i] + 1 : t3[i] > 1 ? t3[i] - 1 : t3[i]
        if (6 * t3[i] < 1) {
          c[i] = t1 + (t2 - t1) * 6 * t3[i]
        } else if (2 * t3[i] < 1) {
          c[i] = t2
        } else if (3 * t3[i] < 2) {
          c[i] = t1 + (t2 - t1) * (2 / 3 - t3[i]) * 6
        } else {
          c[i] = t1
        }
      }

      resC = [round(c[0] * 255), round(c[1] * 255), round(c[2] * 255)]
    }
    if (t === 'r') {
      return resC as [number, number, number]
    } else {
      const hexColor =
        '#' + ((1 << 24) + (resC[0] << 16) + (resC[1] << 8) + resC[2]).toString(16).slice(1)
      return hexColor as string
    }
  }

  function colorReverse(oldColor: string): string {
    oldColor = '0x' + oldColor.replace(/#/g, '');
    let str = '000000' + (0xFFFFFF - Number(oldColor)).toString(16);
    return '#' + str.substring(str.length - 6, str.length);
  }

  return {hsl2rgbORhex,colorReverse}
}
