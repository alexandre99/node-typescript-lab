import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  async parse({ file }: IParseMailTemplateDTO): Promise<string> {
    return file;
  }
}
