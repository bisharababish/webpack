import { handleSubmit } from './formHandler';
import '../styles/resets.scss';
import '../styles/base.scss';
import '../styles/footer.scss';
import '../styles/form.scss';
import '../styles/header.scss';

document.getElementById('form').addEventListener('submit', handleSubmit);