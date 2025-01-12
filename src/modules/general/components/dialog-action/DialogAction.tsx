import styles from './DialogAction.module.scss';

export default function DialogAction({
  children,
  className = '',
}: {
  children: any;
  className?: string;
}) {
  return (
    <div className={`${styles.root} ${className}`}>
      {children}
    </div>
  );
}