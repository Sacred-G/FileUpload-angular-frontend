import { Directive, HostListener, HostBinding, EventEmitter, Output } from '@angular/core';
import { renderTemplate } from '../../node_modules/@angular/core/src/render3/instructions';

@Directive({
  selector: '[appUpload]'
})
export class UploadDirective {

  test

  @Output() private onFileDrop: EventEmitter<File[]> = new EventEmitter();

  @HostBinding('style.border-color') private border = 'rgb(58, 136, 209)';

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(evt) {
    this._preventAndStop(evt);
    this.border = 'rgb(111, 219, 165)';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    this._preventAndStop(evt);
    this.border = 'rgb(58, 136, 209)';
  }

  @HostListener('drop', ['$event']) public onDrop(evt: any): void {
    this._preventAndStop(evt);
    this.border = 'rgb(58, 136, 209)';

    const items = evt.dataTransfer.items;
    this.getFilesWebkitDataTransferItems(items).then((files: File[]) => {
      this.onFileDrop.emit(files); // Why the fuck ya gotta be an error but still work
    })
  }

  // Source: https://stackoverflow.com/questions/3590058/does-html5-allow-drag-drop-upload-of-folders-or-a-folder-tree
  getFilesWebkitDataTransferItems(dataTransferItems) {
    function traverseFileTreePromise(item, path = '') {
      return new Promise(resolve => {
        if (item.isFile) {
          item.file(file => {
            file.filepath = path + file.name //save full path
            files.push(file)
            resolve(file)
          })
        } else if (item.isDirectory) {
          let dirReader = item.createReader()
          dirReader.readEntries(entries => {
            let entriesPromises = []
            for (let entr of entries)
              entriesPromises.push(traverseFileTreePromise(entr, path + item.name + "/"))
            resolve(Promise.all(entriesPromises))
          })
        }
      })
    }

    let files = []
    return new Promise((resolve, reject) => {
      let entriesPromises = []
      for (let it of dataTransferItems)
        entriesPromises.push(traverseFileTreePromise(it.webkitGetAsEntry()))
      Promise.all(entriesPromises)
        .then(entries => {
          //console.log(entries)
          resolve(files)
        })
    })
  }

  _preventAndStop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }
}
