import type { Schema, Struct } from '@strapi/strapi';

export interface BlockBanner extends Struct.ComponentSchema {
  collectionName: 'components_block_banners';
  info: {
    description: 'Banner component with advanced text, style, and layout options';
    displayName: 'Banner';
    icon: 'image';
  };
  attributes: {
    content: Schema.Attribute.Component<'config.section-title', false>;
    style: Schema.Attribute.Component<'config.style-section', false>;
    variation: Schema.Attribute.Enumeration<
      [
        'simple',
        'center',
        'bottom right',
        'left right',
        'box left',
        'box right',
        'circle',
      ]
    > &
      Schema.Attribute.DefaultTo<'simple'>;
  };
}

export interface BlockBlogCard extends Struct.ComponentSchema {
  collectionName: 'components_block_blog_cards';
  info: {
    description: '';
    displayName: 'Blog Post';
    icon: 'collapse';
  };
  attributes: {
    button: Schema.Attribute.Component<'config.link', false>;
    content: Schema.Attribute.Component<'config.section-title', false>;
    empty: Schema.Attribute.Component<'shared.empty', false>;
    posts: Schema.Attribute.Relation<'oneToMany', 'plugin::padma-backend.post'>;
    style: Schema.Attribute.Component<'config.style-section', false>;
  };
}

export interface BlockBlogFilter extends Struct.ComponentSchema {
  collectionName: 'components_block_blog_filters';
  info: {
    description: '';
    displayName: 'Blog Filter';
    icon: 'collapse';
  };
  attributes: {
    description: Schema.Attribute.Text;
    empty: Schema.Attribute.Component<'shared.empty', false>;
    style: Schema.Attribute.Component<'config.style-section', false>;
    title: Schema.Attribute.String;
  };
}

export interface BlockBookmarkList extends Struct.ComponentSchema {
  collectionName: 'components_block_bookmark_lists';
  info: {
    displayName: 'Bookmark List';
    icon: 'bulletList';
  };
  attributes: {
    column_1: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Title'>;
    column_2: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Type'>;
    empty: Schema.Attribute.Component<'shared.empty', false>;
    style: Schema.Attribute.Component<'config.style-section', false>;
    title: Schema.Attribute.String;
  };
}

export interface BlockBreadcrumbs extends Struct.ComponentSchema {
  collectionName: 'components_block_breadcrumbs';
  info: {
    description: '';
    displayName: 'Breadcrumbs';
    icon: 'manyWays';
  };
  attributes: {
    items: Schema.Attribute.JSON;
    separator: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'/'>;
    style: Schema.Attribute.Component<'config.style-section', false>;
    variation: Schema.Attribute.Enumeration<['default', 'simple', 'minimal']> &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface BlockCategoryCard extends Struct.ComponentSchema {
  collectionName: 'components_category_cards';
  info: {
    description: '';
    displayName: 'Category Card';
    icon: 'arrowRight';
  };
  attributes: {
    button: Schema.Attribute.Component<'config.link', false>;
    category: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::padma-backend.category'
    >;
    content: Schema.Attribute.Component<'config.section-title', false>;
    empty: Schema.Attribute.Component<'shared.empty', false>;
    style: Schema.Attribute.Component<'config.style-section', false>;
  };
}

export interface BlockContact extends Struct.ComponentSchema {
  collectionName: 'components_block_contacts';
  info: {
    displayName: 'Contact';
    icon: 'phone';
  };
  attributes: {
    friendlyAddress: Schema.Attribute.String;
    location: Schema.Attribute.String;
  };
}

export interface BlockContentBox extends Struct.ComponentSchema {
  collectionName: 'components_block_content_boxes';
  info: {
    description: 'A content box with text, icons, and style options.';
    displayName: 'Content Box';
    icon: 'box';
  };
  attributes: {
    content: Schema.Attribute.Component<'config.section-title', true>;
    empty: Schema.Attribute.Component<'shared.empty', false>;
    icon_box: Schema.Attribute.Component<'component.icon-box', true>;
    style: Schema.Attribute.Component<'config.style-section', false>;
  };
}

export interface BlockExperience extends Struct.ComponentSchema {
  collectionName: 'components_block_experiences';
  info: {
    displayName: 'Experience';
    icon: 'arrowRight';
  };
  attributes: {
    description: Schema.Attribute.Text;
    endDate: Schema.Attribute.Date;
    institution: Schema.Attribute.String;
    startDate: Schema.Attribute.Date;
    title: Schema.Attribute.String;
  };
}

export interface BlockImageCarousel extends Struct.ComponentSchema {
  collectionName: 'components_block_image_carousels';
  info: {
    description: 'Carousel component with configurable cards and styling options.';
    displayName: 'Image Carousel';
    icon: 'images';
  };
  attributes: {
    autoplay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    cards: Schema.Attribute.Component<'config.carousel-card', true> &
      Schema.Attribute.Required;
    interval: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<3000>;
    style: Schema.Attribute.Component<'config.style-section', false>;
    variation: Schema.Attribute.Enumeration<
      ['default', 'fade', 'slide', 'zoom']
    > &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface BlockImageGallery extends Struct.ComponentSchema {
  collectionName: 'components_block_image_gallery';
  info: {
    description: 'A component for displaying multiple images in various layouts.';
    displayName: 'Image Gallery';
    icon: 'gallery';
  };
  attributes: {
    content: Schema.Attribute.Component<'config.section-title', false>;
    images: Schema.Attribute.Media<undefined, true> & Schema.Attribute.Required;
    style: Schema.Attribute.Component<'config.style-section', false>;
    variation: Schema.Attribute.Enumeration<
      ['grid', 'masonry', 'carousel', 'grid-with-title']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'grid'>;
  };
}

export interface BlockLatestApplied extends Struct.ComponentSchema {
  collectionName: 'components_block_latest_applieds';
  info: {
    displayName: 'Latest Applied';
    icon: 'bulletList';
  };
  attributes: {
    column_1: Schema.Attribute.String;
    column_2: Schema.Attribute.String;
    empty: Schema.Attribute.Component<'shared.empty', false>;
    style: Schema.Attribute.Component<'config.style-section', false>;
    title: Schema.Attribute.String;
  };
}

export interface BlockNotificationList extends Struct.ComponentSchema {
  collectionName: 'components_block_notification_lists';
  info: {
    displayName: 'Notification List';
    icon: 'bulletList';
  };
  attributes: {
    column_1: Schema.Attribute.String & Schema.Attribute.Required;
    empty: Schema.Attribute.Component<'shared.empty', false>;
    style: Schema.Attribute.Component<'config.style-section', false>;
    title: Schema.Attribute.String;
  };
}

export interface BlockPortfolio extends Struct.ComponentSchema {
  collectionName: 'components_block_portfolios';
  info: {
    displayName: 'Portfolio';
    icon: 'clock';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    link: Schema.Attribute.Component<'config.link', false>;
    title: Schema.Attribute.String;
  };
}

export interface BlockPricing extends Struct.ComponentSchema {
  collectionName: 'components_block_pricings';
  info: {
    displayName: 'Pricing';
    icon: 'bulletList';
  };
  attributes: {
    button: Schema.Attribute.Component<'config.link', false>;
    description: Schema.Attribute.Text;
    price: Schema.Attribute.String;
    table: Schema.Attribute.Component<'config.meta-data', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlockReviewBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_reviews';
  info: {
    description: 'A block for displaying multiple reviews with customizable options.';
    displayName: 'Review Block';
    icon: 'star';
  };
  attributes: {
    button: Schema.Attribute.Component<'config.link', false>;
    content: Schema.Attribute.Component<'config.section-title', false>;
    empty: Schema.Attribute.Component<'shared.empty', false>;
    reviews: Schema.Attribute.Component<'config.review-card', true>;
    style: Schema.Attribute.Component<'config.style-section', false>;
    variation: Schema.Attribute.Enumeration<
      ['default', 'compact', 'detailed']
    > &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface ComponentGridContainer extends Struct.ComponentSchema {
  collectionName: 'components_component_grid_containers';
  info: {
    description: '';
    displayName: 'Grid Container';
    icon: 'brush';
  };
  attributes: {
    columns: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 12;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<12>;
    columnSpacing: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    rowSpacing: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    spacing: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    wrap: Schema.Attribute.Enumeration<['wrap-reverse', 'nowrap', 'wrap']> &
      Schema.Attribute.DefaultTo<'wrap'>;
    zeroMinWidth: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface ComponentIconBox extends Struct.ComponentSchema {
  collectionName: 'components_component_icon_boxes';
  info: {
    description: '';
    displayName: 'Icon Box';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Short description about the icon box.'>;
    icon: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'bx:info-circle'>;
    link: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Your Title Here'>;
  };
}

export interface ConfigCarouselCard extends Struct.ComponentSchema {
  collectionName: 'components_carousel_cards';
  info: {
    description: 'Card with title, paragraph, and image for use in carousel components.';
    displayName: 'Carousel Card';
    icon: 'image';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    paragraph: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ConfigHeaderConfig extends Struct.ComponentSchema {
  collectionName: 'components_config_header_configs';
  info: {
    displayName: 'Header Config';
    icon: 'arrowRight';
  };
  attributes: {
    enableDelete: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    enableEdit: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface ConfigHeaderField extends Struct.ComponentSchema {
  collectionName: 'components_config_header_fields';
  info: {
    displayName: 'Header Field';
    icon: 'arrowRight';
  };
  attributes: {
    align: Schema.Attribute.Enumeration<['left', 'right', 'center']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'left'>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Name'>;
    sort: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface ConfigLink extends Struct.ComponentSchema {
  collectionName: 'components_config_links';
  info: {
    description: '';
    displayName: 'Link';
    icon: 'cursor';
  };
  attributes: {
    disabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    icon: Schema.Attribute.String & Schema.Attribute.DefaultTo<'bx:smile'>;
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
    target: Schema.Attribute.Enumeration<['_blank', '_self']>;
    type: Schema.Attribute.Enumeration<['External', 'Internal']>;
  };
}

export interface ConfigLogo extends Struct.ComponentSchema {
  collectionName: 'components_config_logos';
  info: {
    description: '';
    displayName: 'Logo';
    icon: 'chartBubble';
  };
  attributes: {
    link: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images'>;
    md_width: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<175>;
    sm_width: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<160>;
    xs_width: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<150>;
  };
}

export interface ConfigMenu extends Struct.ComponentSchema {
  collectionName: 'components_config_menus';
  info: {
    description: '';
    displayName: 'Menu';
    icon: 'bulletList';
  };
  attributes: {
    child: Schema.Attribute.Component<'config.link', true>;
    disabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    icon: Schema.Attribute.String & Schema.Attribute.DefaultTo<'bx:smile'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.String & Schema.Attribute.Required;
    target: Schema.Attribute.Enumeration<['_blank', '_self']>;
    type: Schema.Attribute.Enumeration<['External', 'Internal']>;
  };
}

export interface ConfigMessage extends Struct.ComponentSchema {
  collectionName: 'components_config_messages';
  info: {
    displayName: 'Message';
    icon: 'arrowRight';
  };
  attributes: {
    cancelButtonText: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Cancel'>;
    copyActionText: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Copy'>;
    editActionText: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Edit'>;
    empty_chat: Schema.Attribute.Component<'shared.empty', false> &
      Schema.Attribute.Required;
    empty_messages: Schema.Attribute.Component<'shared.empty', false> &
      Schema.Attribute.Required;
    enableSearch: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    saveButtonText: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Save'>;
    searchPlaceholder: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Search'>;
    sendMessagePlaceholder: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Type Something'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Messages'>;
  };
}

export interface ConfigMetaData extends Struct.ComponentSchema {
  collectionName: 'components_config_meta_data';
  info: {
    displayName: 'Meta Data';
    icon: 'chartBubble';
  };
  attributes: {
    key: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface ConfigRelations extends Struct.ComponentSchema {
  collectionName: 'components_config_relations';
  info: {
    displayName: 'Relations';
    icon: 'apps';
  };
  attributes: {
    relationId: Schema.Attribute.Integer;
  };
}

export interface ConfigReviewCard extends Struct.ComponentSchema {
  collectionName: 'components_review_cards';
  info: {
    description: '';
    displayName: 'Review Card';
    icon: 'star';
  };
  attributes: {
    avatar: Schema.Attribute.Media;
    date: Schema.Attribute.Date;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    review: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'This is a review text.'>;
    reviewer: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'John Doe'>;
  };
}

export interface ConfigSearchConfig extends Struct.ComponentSchema {
  collectionName: 'components_config_search_configs';
  info: {
    displayName: 'Search Config';
    icon: 'arrowRight';
  };
  attributes: {
    button_placeholder: Schema.Attribute.String;
    category_placeholder: Schema.Attribute.String;
    location_placeholder: Schema.Attribute.String;
    search_placeholder: Schema.Attribute.String;
    sort_placeholder: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ConfigSectionTitle extends Struct.ComponentSchema {
  collectionName: 'components_config_section_titles';
  info: {
    displayName: 'Section Title';
    icon: 'arrowRight';
  };
  attributes: {
    sub_title: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    variation: Schema.Attribute.Enumeration<['Variation One', 'Variation Two']>;
  };
}

export interface ConfigSinglePage extends Struct.ComponentSchema {
  collectionName: 'components_config_single_pages';
  info: {
    description: '';
    displayName: 'Single Page';
    icon: 'arrowRight';
  };
  attributes: {
    collectionModel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'api/padma-backend/posts'>;
    singelModel: Schema.Attribute.String;
    slug: Schema.Attribute.String;
  };
}

export interface ConfigStyleSection extends Struct.ComponentSchema {
  collectionName: 'components_component_style_sections';
  info: {
    description: '';
    displayName: 'Style Section';
    icon: 'arrowUp';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String;
    color: Schema.Attribute.String;
    desktop: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 12;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<12>;
    mobile: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 12;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<12>;
    tab: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<12>;
  };
}

export interface HeaderHeaderBottom extends Struct.ComponentSchema {
  collectionName: 'components_header_header_bottoms';
  info: {
    description: '';
    displayName: 'Header bottom';
    icon: 'bulletList';
  };
  attributes: {
    button: Schema.Attribute.Component<'config.link', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    menu: Schema.Attribute.Component<'config.menu', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    style: Schema.Attribute.Component<'config.style-section', false>;
  };
}

export interface HeaderMainMenu extends Struct.ComponentSchema {
  collectionName: 'components_header_main_menus';
  info: {
    description: 'Main Menu';
    displayName: 'Main Menu';
    icon: 'layout';
  };
  attributes: {
    button: Schema.Attribute.Component<'config.link', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    dark_logo: Schema.Attribute.Component<'config.logo', false>;
    dark_mode: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    language: Schema.Attribute.Component<'config.link', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    light_logo: Schema.Attribute.Component<'config.logo', false>;
    main_menu: Schema.Attribute.Component<'config.menu', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    notification: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    profile_menu: Schema.Attribute.Component<'config.menu', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    style: Schema.Attribute.Component<'config.style-section', false>;
  };
}

export interface HeaderPrivateHeader extends Struct.ComponentSchema {
  collectionName: 'components_header_private_headers';
  info: {
    displayName: 'Private Header';
    icon: 'layout';
  };
  attributes: {
    dark_logo: Schema.Attribute.Component<'config.logo', false>;
    dark_mode: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    language: Schema.Attribute.Component<'config.link', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    light_logo: Schema.Attribute.Component<'config.logo', false>;
    main_menu: Schema.Attribute.Component<'config.menu', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    notification: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    profile_menu: Schema.Attribute.Component<'config.menu', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    side_menu: Schema.Attribute.Component<'config.menu', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    style: Schema.Attribute.Component<'config.style-section', false>;
  };
}

export interface HeaderTopBar extends Struct.ComponentSchema {
  collectionName: 'components_header_top_bars';
  info: {
    description: 'Top bar for additional information and links';
    displayName: 'Top Bar';
    icon: 'bars';
  };
  attributes: {
    left_content: Schema.Attribute.Text;
    right_content: Schema.Attribute.Component<'config.link', true>;
    style: Schema.Attribute.Component<'config.style-section', false>;
  };
}

export interface MetajobBlockAppliedJobs extends Struct.ComponentSchema {
  collectionName: 'components_metajob_block_applied_jobs';
  info: {
    displayName: 'Applied Jobs';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.String;
    style: Schema.Attribute.Component<'config.style-section', false>;
    table_config: Schema.Attribute.Component<
      'metajob-config.table-config',
      false
    >;
    table_head: Schema.Attribute.Component<'metajob-config.meta-data', true>;
    title: Schema.Attribute.String;
  };
}

export interface MetajobBlockBookmark extends Struct.ComponentSchema {
  collectionName: 'components_metajob_block_bookmarks';
  info: {
    displayName: 'Bookmark';
    icon: 'bell';
  };
  attributes: {
    description: Schema.Attribute.String;
    style: Schema.Attribute.Component<'config.style-section', false>;
    table_config: Schema.Attribute.Component<
      'metajob-config.table-config',
      false
    >;
    table_head: Schema.Attribute.Component<'metajob-config.meta-data', true>;
    title: Schema.Attribute.String;
  };
}

export interface MetajobBlockCandidateFilter extends Struct.ComponentSchema {
  collectionName: 'components_metajob_block_candidate_filters';
  info: {
    displayName: 'Candidate Filter';
    icon: 'collapse';
  };
  attributes: {
    empty: Schema.Attribute.Component<'shared.empty', false>;
    search: Schema.Attribute.Component<'metajob-config.search-config', false>;
    show_filter: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface MetajobBlockCompanyFilter extends Struct.ComponentSchema {
  collectionName: 'components_metajob_block_company_filters';
  info: {
    displayName: 'Company Filter';
    icon: 'collapse';
  };
  attributes: {
    description: Schema.Attribute.Text;
    empty: Schema.Attribute.Component<'shared.empty', false>;
    search: Schema.Attribute.Component<'metajob-config.search-config', false>;
    show_filter: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

export interface MetajobBlockJobBanner extends Struct.ComponentSchema {
  collectionName: 'components_metajob_block_job_banners';
  info: {
    displayName: 'Job Banner';
    icon: 'arrowRight';
  };
  attributes: {
    content: Schema.Attribute.Component<'config.section-title', false>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    search: Schema.Attribute.Component<'metajob-config.search-config', false>;
    style: Schema.Attribute.Component<'config.style-section', false>;
  };
}

export interface MetajobBlockJobCard extends Struct.ComponentSchema {
  collectionName: 'components_metajob_block_job_cards';
  info: {
    displayName: 'Job Card';
    icon: 'collapse';
  };
  attributes: {
    button: Schema.Attribute.Component<'config.link', false>;
    content: Schema.Attribute.Component<'config.section-title', false>;
    empty: Schema.Attribute.Component<'shared.empty', false>;
    style: Schema.Attribute.Component<'config.style-section', false>;
  };
}

export interface MetajobBlockJobCategory extends Struct.ComponentSchema {
  collectionName: 'components_metajob_block_job_categories';
  info: {
    displayName: 'Job Category';
    icon: 'arrowRight';
  };
  attributes: {
    button: Schema.Attribute.Component<'config.link', false>;
    content: Schema.Attribute.Component<'config.section-title', false>;
    empty: Schema.Attribute.Component<'shared.empty', false>;
    style: Schema.Attribute.Component<'config.style-section', false>;
  };
}

export interface MetajobBlockJobFilter extends Struct.ComponentSchema {
  collectionName: 'components_metajob_block_job_filters';
  info: {
    displayName: 'Job Filter';
    icon: 'collapse';
  };
  attributes: {
    description: Schema.Attribute.Text;
    search: Schema.Attribute.Component<'metajob-config.search-config', false>;
    title: Schema.Attribute.String;
  };
}

export interface MetajobBlockManageCompany extends Struct.ComponentSchema {
  collectionName: 'components_metajob_block_manage_companies';
  info: {
    displayName: 'Manage Company';
    icon: 'bulletList';
  };
  attributes: {
    add_button_placeholder: Schema.Attribute.String;
    description: Schema.Attribute.String;
    empty: Schema.Attribute.Component<'shared.empty', false>;
    style: Schema.Attribute.Component<'config.style-section', false>;
    table_config: Schema.Attribute.Component<
      'metajob-config.table-config',
      false
    >;
    table_head: Schema.Attribute.Component<'metajob-config.meta-data', true>;
    title: Schema.Attribute.String;
  };
}

export interface MetajobBlockManageJob extends Struct.ComponentSchema {
  collectionName: 'components_metajob_block_manage_jobs';
  info: {
    displayName: 'Manage Job';
    icon: 'bulletList';
  };
  attributes: {
    add_button_placeholder: Schema.Attribute.String;
    description: Schema.Attribute.String;
    empty: Schema.Attribute.Component<'shared.empty', false>;
    style: Schema.Attribute.Component<'config.style-section', false>;
    table_config: Schema.Attribute.Component<
      'metajob-config.table-config',
      false
    >;
    table_head: Schema.Attribute.Component<'metajob-config.meta-data', true>;
    title: Schema.Attribute.String;
  };
}

export interface MetajobBlockManageResume extends Struct.ComponentSchema {
  collectionName: 'components_metajob_block_manage_resumes';
  info: {
    displayName: 'Manage Resume';
    icon: 'arrowRight';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface MetajobConfigHeaderConfig extends Struct.ComponentSchema {
  collectionName: 'components_metajob_config_header_configs';
  info: {
    displayName: 'Header Config';
    icon: 'arrowRight';
  };
  attributes: {
    enableDelete: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    enableEdit: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface MetajobConfigHeaderField extends Struct.ComponentSchema {
  collectionName: 'components_metajob_config_header_fields';
  info: {
    displayName: 'Header Field';
    icon: 'arrowRight';
  };
  attributes: {
    align: Schema.Attribute.Enumeration<['left', 'right', 'center']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'left'>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Name'>;
    sort: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface MetajobConfigMessage extends Struct.ComponentSchema {
  collectionName: 'components_metajob_config_messages';
  info: {
    displayName: 'Message';
    icon: 'arrowRight';
  };
  attributes: {
    cancelButtonText: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Cancel'>;
    copyActionText: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Copy'>;
    editActionText: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Edit'>;
    empty_chat: Schema.Attribute.Component<'shared.empty', false> &
      Schema.Attribute.Required;
    empty_messages: Schema.Attribute.Component<'shared.empty', false> &
      Schema.Attribute.Required;
    enableSearch: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    saveButtonText: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Save'>;
    searchPlaceholder: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Search'>;
    sendMessagePlaceholder: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Type Something'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Messages'>;
  };
}

export interface MetajobConfigMetaData extends Struct.ComponentSchema {
  collectionName: 'components_metajob_config_meta_data';
  info: {
    displayName: 'Meta Data';
    icon: 'chartBubble';
  };
  attributes: {
    key: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface MetajobConfigRelations extends Struct.ComponentSchema {
  collectionName: 'components_metajob_config_relations';
  info: {
    displayName: 'Relations';
    icon: 'apps';
  };
  attributes: {
    relationId: Schema.Attribute.Integer;
  };
}

export interface MetajobConfigSearchConfig extends Struct.ComponentSchema {
  collectionName: 'components_metajob_config_search_configs';
  info: {
    displayName: 'Search Config';
    icon: 'arrowRight';
  };
  attributes: {
    button_placeholder: Schema.Attribute.String;
    category_placeholder: Schema.Attribute.String;
    location_placeholder: Schema.Attribute.String;
    search_placeholder: Schema.Attribute.String;
    sort_placeholder: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface MetajobConfigTableConfig extends Struct.ComponentSchema {
  collectionName: 'components_metajob_config_table_configs';
  info: {
    displayName: 'Table Config';
    icon: 'arrowRight';
  };
  attributes: {
    default_data_count: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<10>;
    enable_delete: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    enable_edit: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    enable_search: Schema.Attribute.Boolean;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Name'>;
    per_page_placeholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Showing per page'>;
    search_placeholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Search'>;
    table_head: Schema.Attribute.Component<'metajob-config.meta-data', true>;
  };
}

export interface MetajobSingleTypeCompanyDetails
  extends Struct.ComponentSchema {
  collectionName: 'components_metajob_single_type_company_details';
  info: {
    displayName: 'Company Details';
    icon: 'arrowRight';
  };
  attributes: {
    empty: Schema.Attribute.Component<'shared.empty', false>;
    open_jobs: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    styles: Schema.Attribute.Component<'config.style-section', false>;
    title: Schema.Attribute.String;
  };
}

export interface MetajobSingleTypeJobDetails extends Struct.ComponentSchema {
  collectionName: 'components_metajob_single_type_job_details';
  info: {
    displayName: 'Job Details';
    icon: 'arrowRight';
  };
  attributes: {
    empty: Schema.Attribute.Component<'shared.empty', false>;
    related_lists: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    styles: Schema.Attribute.Component<'config.style-section', false>;
    title: Schema.Attribute.String;
  };
}

export interface MetajobSingleTypeResumeDetails extends Struct.ComponentSchema {
  collectionName: 'components_metajob_single_type_resume_details';
  info: {
    displayName: 'Resume Details';
    icon: 'arrowRight';
  };
  attributes: {
    empty: Schema.Attribute.Component<'shared.empty', false>;
    styles: Schema.Attribute.Component<'config.style-section', false>;
    title: Schema.Attribute.String;
  };
}

export interface SharedEmpty extends Struct.ComponentSchema {
  collectionName: 'components_shared_empties';
  info: {
    description: '';
    displayName: 'Empty State';
    icon: 'archive';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Try to refresh the page or check back later'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'No Data Founds'>;
  };
}

export interface SharedMetaSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    description: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    socialNetwork: Schema.Attribute.Enumeration<['Facebook', 'Twitter']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    metaRobots: Schema.Attribute.String;
    metaSocial: Schema.Attribute.Component<'shared.meta-social', true>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedShareMenu extends Struct.ComponentSchema {
  collectionName: 'components_shared_shared_menus';
  info: {
    displayName: 'Share Menu';
    icon: 'server';
  };
  attributes: {
    menus: Schema.Attribute.Component<'config.menu', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    role: Schema.Attribute.Enumeration<['candidate', 'employer']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'candidate'>;
  };
}

export interface SharedSocialMedias extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_medias';
  info: {
    displayName: 'Social Medias';
    icon: 'earth';
  };
  attributes: {
    link: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<
      [
        'facebook',
        'instagram',
        'twitter',
        'linkedin',
        'snapchat',
        'tiktok',
        'pinterest',
        'reddit',
        'tumblr',
        'youtube',
        'whatsapp',
        'wechat',
        'discord',
        'telegram',
        'viber',
        'line',
        'kik',
        'clubhouse',
      ]
    > &
      Schema.Attribute.Required;
  };
}

export interface SharedSpacing extends Struct.ComponentSchema {
  collectionName: 'components_shared_spacings';
  info: {
    displayName: 'spacing';
    icon: 'oneToOne';
  };
  attributes: {
    gap: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
  };
}

export interface SingleTypeBlogDetails extends Struct.ComponentSchema {
  collectionName: 'components_single_type_blog_details';
  info: {
    displayName: 'Blog Details';
    icon: 'arrowRight';
  };
  attributes: {
    sidebar: Schema.Attribute.Enumeration<
      ['Left Sidebar', 'Right Sidebar', 'Both Sidebar', 'No Sidebar']
    >;
    style: Schema.Attribute.Component<'config.style-section', false>;
    title: Schema.Attribute.String;
  };
}

export interface UiJobInfo extends Struct.ComponentSchema {
  collectionName: 'components_ui_job_infos';
  info: {
    displayName: 'Job Info';
    icon: 'user';
  };
  attributes: {
    bio: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    profilePicture: Schema.Attribute.Media<'images'>;
  };
}

export interface WidgetAppliedList extends Struct.ComponentSchema {
  collectionName: 'components_widget_applied_lists';
  info: {
    displayName: 'Applied List';
    icon: 'oneToOne';
  };
  attributes: {
    details: Schema.Attribute.Component<'widget.count-card', false>;
    style: Schema.Attribute.Component<'config.style-section', false>;
  };
}

export interface WidgetClosedJob extends Struct.ComponentSchema {
  collectionName: 'components_widget_closed_jobs';
  info: {
    displayName: 'Closed Job';
    icon: 'arrowRight';
  };
  attributes: {
    details: Schema.Attribute.Component<'widget.count-card', false>;
    style: Schema.Attribute.Component<'config.style-section', false>;
  };
}

export interface WidgetContactWidget extends Struct.ComponentSchema {
  collectionName: 'components_footer_contact_widgets';
  info: {
    displayName: 'Contact Info';
    icon: 'envelop';
  };
  attributes: {
    description: Schema.Attribute.Text;
    email: Schema.Attribute.String;
    location: Schema.Attribute.String;
    logo: Schema.Attribute.Component<'config.logo', false>;
    phone: Schema.Attribute.String;
    style: Schema.Attribute.Component<'config.style-section', false>;
    title: Schema.Attribute.String;
  };
}

export interface WidgetCopyrightBar extends Struct.ComponentSchema {
  collectionName: 'components_widget_copyright_bars';
  info: {
    description: 'Bottom-most section for copyright text';
    displayName: 'Copyright Bar';
    icon: 'copyright';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    social_link: Schema.Attribute.Component<'shared.social-medias', true>;
  };
}

export interface WidgetCountCard extends Struct.ComponentSchema {
  collectionName: 'components_widget_count_cards';
  info: {
    displayName: 'Count Card';
    icon: 'apps';
  };
  attributes: {
    count: Schema.Attribute.BigInteger;
    dynamicCount: Schema.Attribute.Boolean;
    enableStats: Schema.Attribute.Boolean;
    isLink: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.String;
    model: Schema.Attribute.String;
    subTitle: Schema.Attribute.String;
    target: Schema.Attribute.Enumeration<
      ['_self', '_blank', '_parent', '_top']
    > &
      Schema.Attribute.DefaultTo<'_self'>;
    title: Schema.Attribute.String;
  };
}

export interface WidgetFavoriteList extends Struct.ComponentSchema {
  collectionName: 'components_widget_favorite_lists';
  info: {
    displayName: 'Favorite List';
    icon: 'arrowRight';
  };
  attributes: {
    details: Schema.Attribute.Component<'widget.count-card', false>;
    style: Schema.Attribute.Component<'config.style-section', false>;
  };
}

export interface WidgetMatchedList extends Struct.ComponentSchema {
  collectionName: 'components_widget_matched_lists';
  info: {
    displayName: 'Matched List';
    icon: 'arrowRight';
  };
  attributes: {
    details: Schema.Attribute.Component<'widget.count-card', false>;
    style: Schema.Attribute.Component<'config.style-section', false>;
  };
}

export interface WidgetMenuWidget extends Struct.ComponentSchema {
  collectionName: 'components_footer_menu_widgets';
  info: {
    displayName: 'Menu Widget';
    icon: 'arrowDown';
  };
  attributes: {
    menu_items: Schema.Attribute.Component<'config.link', true>;
    style: Schema.Attribute.Component<'config.style-section', false>;
    title: Schema.Attribute.String;
  };
}

export interface WidgetOpenJob extends Struct.ComponentSchema {
  collectionName: 'components_widget_open_jobs';
  info: {
    displayName: 'Open Job';
    icon: 'arrowRight';
  };
  attributes: {
    details: Schema.Attribute.Component<'widget.count-card', false>;
    style: Schema.Attribute.Component<'config.style-section', false>;
  };
}

export interface WidgetTotalJob extends Struct.ComponentSchema {
  collectionName: 'components_widget_total_jobs';
  info: {
    displayName: 'Total Job';
    icon: 'arrowRight';
  };
  attributes: {
    details: Schema.Attribute.Component<'widget.count-card', false>;
    style: Schema.Attribute.Component<'config.style-section', false>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'block.banner': BlockBanner;
      'block.blog-card': BlockBlogCard;
      'block.blog-filter': BlockBlogFilter;
      'block.bookmark-list': BlockBookmarkList;
      'block.breadcrumbs': BlockBreadcrumbs;
      'block.category-card': BlockCategoryCard;
      'block.contact': BlockContact;
      'block.content-box': BlockContentBox;
      'block.experience': BlockExperience;
      'block.image-carousel': BlockImageCarousel;
      'block.image-gallery': BlockImageGallery;
      'block.latest-applied': BlockLatestApplied;
      'block.notification-list': BlockNotificationList;
      'block.portfolio': BlockPortfolio;
      'block.pricing': BlockPricing;
      'block.review-block': BlockReviewBlock;
      'component.grid-container': ComponentGridContainer;
      'component.icon-box': ComponentIconBox;
      'config.carousel-card': ConfigCarouselCard;
      'config.header-config': ConfigHeaderConfig;
      'config.header-field': ConfigHeaderField;
      'config.link': ConfigLink;
      'config.logo': ConfigLogo;
      'config.menu': ConfigMenu;
      'config.message': ConfigMessage;
      'config.meta-data': ConfigMetaData;
      'config.relations': ConfigRelations;
      'config.review-card': ConfigReviewCard;
      'config.search-config': ConfigSearchConfig;
      'config.section-title': ConfigSectionTitle;
      'config.single-page': ConfigSinglePage;
      'config.style-section': ConfigStyleSection;
      'header.header-bottom': HeaderHeaderBottom;
      'header.main-menu': HeaderMainMenu;
      'header.private-header': HeaderPrivateHeader;
      'header.top-bar': HeaderTopBar;
      'metajob-block.applied-jobs': MetajobBlockAppliedJobs;
      'metajob-block.bookmark': MetajobBlockBookmark;
      'metajob-block.candidate-filter': MetajobBlockCandidateFilter;
      'metajob-block.company-filter': MetajobBlockCompanyFilter;
      'metajob-block.job-banner': MetajobBlockJobBanner;
      'metajob-block.job-card': MetajobBlockJobCard;
      'metajob-block.job-category': MetajobBlockJobCategory;
      'metajob-block.job-filter': MetajobBlockJobFilter;
      'metajob-block.manage-company': MetajobBlockManageCompany;
      'metajob-block.manage-job': MetajobBlockManageJob;
      'metajob-block.manage-resume': MetajobBlockManageResume;
      'metajob-config.header-config': MetajobConfigHeaderConfig;
      'metajob-config.header-field': MetajobConfigHeaderField;
      'metajob-config.message': MetajobConfigMessage;
      'metajob-config.meta-data': MetajobConfigMetaData;
      'metajob-config.relations': MetajobConfigRelations;
      'metajob-config.search-config': MetajobConfigSearchConfig;
      'metajob-config.table-config': MetajobConfigTableConfig;
      'metajob-single-type.company-details': MetajobSingleTypeCompanyDetails;
      'metajob-single-type.job-details': MetajobSingleTypeJobDetails;
      'metajob-single-type.resume-details': MetajobSingleTypeResumeDetails;
      'shared.empty': SharedEmpty;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
      'shared.share-menu': SharedShareMenu;
      'shared.social-medias': SharedSocialMedias;
      'shared.spacing': SharedSpacing;
      'single-type.blog-details': SingleTypeBlogDetails;
      'ui.job-info': UiJobInfo;
      'widget.applied-list': WidgetAppliedList;
      'widget.closed-job': WidgetClosedJob;
      'widget.contact-widget': WidgetContactWidget;
      'widget.copyright-bar': WidgetCopyrightBar;
      'widget.count-card': WidgetCountCard;
      'widget.favorite-list': WidgetFavoriteList;
      'widget.matched-list': WidgetMatchedList;
      'widget.menu-widget': WidgetMenuWidget;
      'widget.open-job': WidgetOpenJob;
      'widget.total-job': WidgetTotalJob;
    }
  }
}
