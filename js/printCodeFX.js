async function init () {   
    while (true) {
        const node = document.querySelector("#type-text")
        const node1 = document.querySelector("#type-text1")
        const node2 = document.querySelector("#type-text2")
        const node3 = document.querySelector("#type-text3")
        const node4 = document.querySelector("#type-text4")
        const node5 = document.querySelector("#type-text5")

        node1.insertAdjacentHTML(
            `afterend`,
            `<font color="white"><span id="cursor" class="blinking-cursor">_</span></font>`
        );
  
        await sleep(1000)
        await node.type(`find:run`)
        await sleep(700)
        await node1.type(`favorite`)
        await sleep(500)
        document.getElementById('cursor').remove();
        await node2.type(`executing`)
        for (let i = 0; i < 20; i++)
        {
            await sleep(100)
            await node2.type(`. `)
        }
        await sleep(200)
        await node3.type(`Done.`)
        await sleep(100)
        await node4.type(`MANY_interesting_persor_were_found!`)
        await sleep(100)
        await node5.type(`Let's_start?`)
        document.getElementById('notepad').insertAdjacentHTML(
            `beforeend`,
            `<div id="endNotepad"><font color="#51ff00">SoulGone@me/</font>$
            <span id="cursor" class="blinking-cursor">_</span></div>`
        );
        await sleep(1000)

        let notepad = document.getElementById('notepad');        
        for (let h = 0; h < 160; h++)
        {
            let top = (window.getComputedStyle ?
                window.getComputedStyle(notepad, null).getPropertyValue('top') :
                notepad.currentStyle? notepad.currentStyle.top : '0'
            );

            notepad.style.top = `calc(${top} - 1px)`;
            await sleep(2)
        }
        

        node.innerHTML = '';
        node1.innerHTML = '';
        node2.innerHTML = '';
        node3.innerHTML = '';
        node4.innerHTML = '';
        node5.innerHTML = '';
        document.getElementById('endNotepad').remove();
        notepad.style.top = `40px`;
    }
  }
  
  const sleep = time => new Promise(resolve => setTimeout(resolve, time))
  
  class TypeAsync extends HTMLSpanElement {
    get typeInterval () {
      const randomMs = 100 * Math.random()
      return randomMs < 50 ? 10 : randomMs
    }
    
    async type (text) {
      for (let character of text) {
        this.innerText += character
        await sleep(this.typeInterval)
      }
    }
    
    async delete (text) {
      for (let character of text) {
        this.innerText = this.innerText.slice(0, this.innerText.length -1)
        await sleep(this.typeInterval)
      }
    }
  }
  
  customElements.define('type-async', TypeAsync, { extends: 'span' })
  
  
  init()