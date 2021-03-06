export default class Logo {
  constructor() {
    this.$logo = $('.header-branding__logo svg');

    const colors = [
      {
        'words': '#000000',
        'banana': '#80ff00',
        'outline': '#fb22ff',
        'rectangle': '#7dfaf6',
      },
      {
        'words': '#69c4e0',
        'banana': '#ffb000',
        'outline': '#755400',
        'rectangle': '#fade7d',
      },
      {
        'words': '#73dbdb',
        'banana': '#7767ad',
        'outline': '#f9ea27',
        'rectangle': '#146166',
      },
      {
        'words': '#42e48d',
        'banana': '#9c0202',
        'outline': '#ffffff',
        'rectangle': '#333333',
      },
      {
        'words': '#2e2e2e',
        'banana': '#f6e262',
        'outline': '#2e2e2e',
        'rectangle': '#d8d8d8',
      }
    ]

    this._rotateLogoColors(colors);
  }

  _rotateLogoColors(colors) {
    let index = -1;

    setInterval(() => {
      index++;

      if (index == colors.length) {
        index = 0;
      }

      $('.logo__text', this.$logo).css('fill', colors[index].words);
      $('.logo__banana-fill', this.$logo).css('fill', colors[index].banana);
      $('.logo__banana-outline', this.$logo).css('fill', colors[index].outline);
      $('.logo__rectangle', this.$logo).css('fill', colors[index].rectangle);
    }, 15000);
  }
}
