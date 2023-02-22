import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEditorModalComponent } from './text-editor-modal.component';
import { TextEditorModalModule } from './text-editor-modal.module';

describe('Text editor within a modal', () => {
  function closeModal(): void {
    getCloseButton()?.click();
  }

  function getCloseButton(): HTMLElement | null {
    return document.querySelector('#close-button');
  }

  function getTextEditorBodyElement(): HTMLElement | undefined {
    return (
      document.querySelector(
        '.sky-text-editor-wrapper'
      ) as HTMLIFrameElement | null
    )?.contentDocument?.body;
  }

  function getOpenButton(): HTMLElement | null {
    return fixture.nativeElement.querySelector('#trigger-button');
  }

  function openModal(): void {
    getOpenButton()?.click();
  }

  let fixture: ComponentFixture<TextEditorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TextEditorModalModule],
    });

    fixture = TestBed.createComponent(TextEditorModalComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    closeModal();
  });

  it('should render the text editor within the modal', () => {
    openModal();

    expect(getTextEditorBodyElement()).not.toBeNull();
  });
});
