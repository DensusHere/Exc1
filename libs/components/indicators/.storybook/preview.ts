import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SkyAlertModule } from '@skyux/indicators';
import { PreviewWrapperModule } from '@skyux/storybook';
import { SkyThemeService } from '@skyux/theme';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

export const parameters = {};

export const decorators = [
  moduleMetadata({
    imports: [CommonModule, NoopAnimationsModule, PreviewWrapperModule, SkyAlertModule],
    providers: [SkyThemeService],
  }),
  componentWrapperDecorator(
    (story) => `<sky-preview-wrapper>${story}</sky-preview-wrapper>`,
    ({ globals }) => ({ theme: globals.theme })
  ),
];
