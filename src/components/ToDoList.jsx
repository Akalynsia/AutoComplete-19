import savedData from "../savedData";
import { useState, useEffect } from "react";
export default function ToDoList() {
  const [listData, setListData] = useState(savedData);
  const [newItemInput, setNewItemInput] = useState("");
  const [autoCompleteRequested, setAutoCompleteRequested] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  function handleCheckBoxChange(event) {
    setListData((prevList) => {
      return prevList.map((item) => {
        return item.id === event.target.name
          ? { ...item, complete: !item.complete }
          : item;
      });
    });
  }

  function handleNewItemInputChange(event) {
    setNewItemInput(event.target.value);
  }

  if (typeof window !== "undefined") {
    const div = document.querySelector(".to-do-list-container");
  }

  useEffect(() => {
    if (div) {
      div.scrollTop = div.scrollHeight;
    }
  }, [listData]);

  /**** En Alakalı Kod **************************************************************************/

  function handleEnter(event) {
    if (newItemInput.trim()) {
      if (event.key === "Enter") {
        setListData((prevList) => {
          const newListItem = {
            text: newItemInput,
            complete: false,
            id: crypto.randomUUID(),
          };
          return [...prevList, newListItem];
        });
        setNewItemInput("");
      }
    }
  }

  function autoComplete() {
    setAutoCompleteRequested(true);
  }

  useEffect(() => {
    if (autoCompleteRequested) {
      let timeOut = setTimeout(() => {
        setAutoCompleteRequested(false);
        setListData((prevData) => {
          return prevData.map((item) => {
            return { ...item, complete: true };
          });
        });
      }, 2000);

      return () => clearTimeout(timeOut);
    }
  }, [autoCompleteRequested]);

  /* Challenge
  
    1. ClassName'i "new-item-input" olan text input focus'ta olduğunda, opacity 
	   className'i "add-item-icon" olan görselin className'ine "faded" class'ı eklenerek 0.2 olarak ayarlanmalıdır. Input focus olmadığında ise bu class image'den kaldırılmalıdır.
       
    2. Kullanıcı yapılacaklar listesine yeni bir öğe eklediğinde, text input elementi 
       metinden temizlenir ve tekrar boş hale gelir.
       
    3. Kullanıcı "Otomatik Tamamla" butonuna tıkladığında, yapılacaklar listesi öğelerinin üzeri çizilirken onay kutularının tümü aynı anda işaretlenmelidir. 
       
4. Bu görevleri tamamlamak için, bu yorumların altındaki kodda birkaç küçük değişiklik yapmanız gerekecektir. Ayrıca bu dosyaya birkaç küçük ekleme yapmanız gerekecektir. Bu eklemeleri nereye yapılması gerektiğini düşünüyorsanız oraya yapabilirsiniz. Kendinizi çok fazla kod değiştirirken veya eklerken bulursanız, işleri aşırı derecede karmaşık hale getiriyorsunuz demektir 
       
    Not: 32. satır ("En Alakalı Kod" olarak işaretlenmiştir) ile bu yorumlar arasındaki kodu okumalısınız. Bu kodun bazı yönleri bu görevleri tamamlamakla ilgilidir. Ancak, bu kod üzerinde herhangi bir değişiklik yapmanıza gerek yoktur. Sadece anlamanız gerekiyor
*/

  const currentList = listData.map((item) => {
    return (
      <div className="to-do-list-item-container" key={item.id}>
        <label className="checkbox-label">
          {autoCompleteRequested ? (
            <input
              type="checkbox"
              name={item.id}
              onChange={handleCheckBoxChange}
              checked
            />
          ) : (
            <input
              type="checkbox"
              name={item.id}
              onChange={handleCheckBoxChange}
            />
          )}

          <span className="checkmark"></span>
          <p
            className={`to-do-list-item-text ${item.complete && "crossed-out"}`}
          >
            {item.text}
          </p>
        </label>
        <div className="all-progress-bars-container">
          {!item.complete && autoCompleteRequested && (
            <div className="progress-bar-container">
              <div className="progress-bar-content"></div>
            </div>
          )}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="to-do-list-container">
        {currentList}
        <label className="new-item-label">
          <img
            src="./images/add-item.svg"
            className={`add-item-icon ${inputFocused ? "faded" : ""}`}
          />
          <input
            className="new-item-input"
            type="text"
            onKeyDown={handleEnter}
            onChange={handleNewItemInputChange}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            value={newItemInput}
          />
        </label>
      </div>
      <div className="do-it-button-container">
        <button onClick={autoComplete}>Otomatik Tamamlama</button>
      </div>
    </div>
  );
}
