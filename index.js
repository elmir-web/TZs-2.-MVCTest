class MVCTest {
  // Наш класс MVC
  static View_ShowUI() {
    document.querySelector("div.container").innerHTML = `
    <div class="row-rules">
        <span
          >Введите в строку ниже пароль, чтобы проверить его на наши
          условия:</span
        >
        <ul class="rules-items">
          <li>Пароль должен быть от 3 до 20 символов (включительно)</li>
          <li>Пароль должен иметь в себе хотя бы одно число</li>
          <li>Пароль должен иметь в себе хотя бы одну точку</li>
        </ul>
      </div>
      <form class="form-checkpass">
        <input
          class="input-password"
          type="text"
          autofocus
          name="password"
          placeholder="Введите пароль для проверки"
          required
        />
      </form>
      <hr />
      <span class="password-check-result"
        >Результат: Текст здесь будет изменен</span
      >
    `;

    MVCTest.Model_ViewStatus(
      "success",
      `Чтобы увидеть результат, введите текст пароля и уберите
        курсор`
    );
  }

  static Model_ViewStatus(status, reason) {
    // Наша модель которая реагирует на подаваемые ей изменения
    document.querySelector("span.password-check-result").innerHTML = reason; // полученный параметр на этот метод-функцию мы иннерим в нужный там html тег

    if (status === "success") {
      document.querySelector("span.password-check-result").style =
        "color: green;"; // если одни из параметров успешен то мы зеленим
    } else if (status === "failure") {
      document.querySelector("span.password-check-result").style =
        "color: red;"; // или показываем красным
    }
    return;
  }

  static Controller_CheckPass() {
    // Наш контроллер который проверяет поле для ввода
    let tempInputPassword = document.querySelector(
      "input.input-password"
    ).value; // сохраняем текст с поля в нашу временную переменную

    if (tempInputPassword.length === 0)
      return MVCTest.Model_ViewStatus("failure", `Заполните поле для ввода`); // вызываем нашу модель, чтобы она обновилась если пароль не заполнен

    if (tempInputPassword.length < 3 || tempInputPassword.length > 20)
      return MVCTest.Model_ViewStatus(
        "failure",
        `Пароль должен быть от 3 до 20 символов (включительно)`
      ); // вызываем нашу модель, чтобы она обновилась если пароль до 3 или больше 20 символов включительно

    let indexInts = 0; // счетчик чисел
    let indexDot = 0; // счетчик точек

    for (let i = 0; i < tempInputPassword.length; i++) {
      // цикл по каждому элементу строки
      let tempInputItem = tempInputPassword[i]; // запишем во временную переменную каждый элемент строки

      if (!isNaN(tempInputItem)) indexInts++; // считаем числа

      if (tempInputItem === ".") indexDot++; // считаем точки
    }

    if (indexInts < 1)
      return MVCTest.Model_ViewStatus(
        "failure",
        `Результат: Пароль должен иметь в себе хотя бы одно число`
      ); // вызываем нашу модель, чтобы она обновилась если пароль не имеет числа

    if (indexDot < 1)
      return MVCTest.Model_ViewStatus(
        "failure",
        `Результат: Пароль должен иметь в себе хотя бы одну точку`
      ); // вызываем нашу модель, чтобы она обновилась если пароль не имеет точки

    MVCTest.Model_ViewStatus(
      "success",
      `Результат: Пароль соответствует условиям`
    ); // вызываем нашу модель, чтобы она обновилась если пароль успешен
  }
}

window.onload = () => {
  // будет работать только когда наша страница полностью загрузится
  MVCTest.View_ShowUI(); // вьювим типа интерфейс

  document
    .querySelector("input.input-password")
    .addEventListener("change", MVCTest.Controller_CheckPass); // вешаем наш контроллер на событие изменения контента на поле ввода
};
