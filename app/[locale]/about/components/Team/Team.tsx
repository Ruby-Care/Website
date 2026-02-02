import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styles from './Team.module.css';

export default function Team() {
  const t = useTranslations('about');

  return (
    <div className={styles.team}>
      <div className="container-rg">
        <div className={styles.titleContainer}>
          <h2 className="type-display">{t('team.title')}</h2>
          <p className="type-title">{t('team.subtitle')}</p>
        </div>

        <div className={styles.teamMembers}>
          <div className={styles.teamMember}>
            <Image
              src="/img/lukasz.webp"
              alt={t('team.members.chiefExecutive.name')}
              className={styles.teamMemberImage}
              width={116}
              height={116}
            />

            <div className={styles.teamMemberInfo}>
              <p className={`${styles.teamMemberName} type-title`}>
                {t('team.members.chiefExecutive.name')}
              </p>
              <p className={`${styles.teamMemberRole} type-title`}>
                {t('team.members.chiefExecutive.role')}
              </p>
            </div>
          </div>
          <div className={styles.teamMember}>
            <Image
              src="/img/a7ti42.webp"
              alt={t('team.members.chiefProduct.name')}
              className={styles.teamMemberImage}
              width={116}
              height={116}
            />
            <div className={styles.teamMemberInfo}>
              <p className={`${styles.teamMemberName} type-title`}>
                {t('team.members.chiefProduct.name')}
              </p>
              <p className={`${styles.teamMemberRole} type-title`}>
                {t('team.members.chiefProduct.role')}
              </p>
            </div>
          </div>
          <div className={styles.teamMember}>
            <Image
              src="/img/marcus.webp"
              alt={t('team.members.medicalAdvisor.name')}
              className={styles.teamMemberImage}
              width={116}
              height={116}
            />
            <div className={styles.teamMemberInfo}>
              <p className={`${styles.teamMemberName} type-title`}>
                {t('team.members.medicalAdvisor.name')}
              </p>
              <p className={`${styles.teamMemberRole} type-title`}>
                {t('team.members.medicalAdvisor.role')}
              </p>
            </div>
          </div>
        </div>
        <p className={`${styles.teamMembersDesc} type-subtitle`}>
          {t('team.description')}
        </p>
      </div>
    </div>
  );
}
