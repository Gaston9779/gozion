(() => {
  const groups = {
    Layout: ['Box','Flex','Stack','Grid','Center','Container','Divider','AspectRatio'],
    Typography: ['Text','Heading','Link','Kbd','List'],
    Forms: ['Input','InputGroup','Textarea','NumberInput','PasswordInput','SearchInput','OTPInput','PinInput','FileUpload','FormControl'],
    Selection: ['Checkbox','Radio','RadioGroup','Switch','Select','MultiSelect','Combobox','Slider','RangeSlider','Rating','SegmentedControl','Toggle','ToggleGroup'],
    Navigation: ['Navbar','Sidebar','Breadcrumb','Tabs','Pagination','Stepper','TreeView'],
    Overlay: ['Dialog','AlertDialog','Drawer','Modal','Sheet','Popover','Tooltip','DropdownMenu','ContextMenu','HoverCard'],
    Feedback: ['Alert','Toast','Progress','Spinner','Skeleton','LoadingOverlay','EmptyState','Status'],
    'Data Display': ['Accordion','Avatar','AvatarGroup','Badge','Card','Chip','Table','Tag','Timeline'],
    Media: ['Icon','Image'],
    Interaction: ['Button','ButtonGroup','IconButton','CloseButton','Pressable','Hoverable','ScrollArea'],
    Effects: ['GlassSurface','GradientSurface','Glow','BlurSurface','AnimatedBorder','Shine','Spotlight','Mask','Overlay'],
    Utilities: ['Collapsible','CopyButton','VisuallyHidden'],
    Particles: (globalThis.GOZION_PARTICLE_EFFECTS || []).map(effect => effect.name)
  };
  const copy = {
    it: {docs:'Documentazione',components:'Componenti',studio:'Tema',particles:'Particellari',search:'Cerca particellari e componenti',start:'Per iniziare',intro:'Introduzione',install:'Installazione',catalogue:'Catalogo',all:'Tutti i componenti',catalogueTitle:'Particellari prima, componenti quando servono.',catalogueIntro:'Particellari interattivi per dare identità ai prodotti; componenti accessibili per costruire il resto.',live:'Anteprima interattiva',usage:'Utilizzo',custom:'Personalizzazione',a11y:'Accessibilità',api:'API',copy:'Copia',copied:'Copiato',stable:'Stabile',beta:'Beta',preview:'Anteprima',open:'Apri',close:'Chiudi',disabled:'Disabilitato',size:'Dimensione',state:'Stato',variant:'Variante',density:'Densità',placement:'Posizione',language:'Lingua',theme:'Tema'},
    en: {docs:'Docs',components:'Components',studio:'Theme studio',particles:'Particles',search:'Search particles and components',start:'Getting started',intro:'Introduction',install:'Installation',catalogue:'Catalogue',all:'All components',catalogueTitle:'Particles first, components when needed.',catalogueIntro:'Interactive particles give products identity; accessible components build the rest.',live:'Interactive preview',usage:'Usage',custom:'Customization',a11y:'Accessibility',api:'API',copy:'Copy',copied:'Copied',stable:'Stable',beta:'Beta',preview:'Preview',open:'Open',close:'Close',disabled:'Disabled',size:'Size',state:'State',variant:'Variant',density:'Density',placement:'Placement',language:'Language',theme:'Theme'}
  };
  const specialDescriptions = {
    Box:['Superficie di base per costruire layout e applicare token.','The base surface for layout and token styling.'], Flex:['Distribuisce elementi lungo un asse con allineamento e spazio controllati.','Distributes items on one axis with controlled alignment and spacing.'], Stack:['Compone elementi verticalmente con ritmo coerente.','Composes elements vertically with consistent rhythm.'], Grid:['Organizza contenuti in colonne responsive.','Organizes content into responsive columns.'], Center:['Centra il contenuto su entrambi gli assi.','Centers content on both axes.'], Container:['Limita e centra la larghezza dei contenuti.','Constrains and centers content width.'], Divider:['Separa visivamente gruppi di contenuto.','Visually separates content groups.'], AspectRatio:['Mantiene proporzioni stabili per media e contenuti.','Preserves stable proportions for media and content.'], Button:['Azione primaria accessibile con varianti, dimensioni e stati.','Accessible primary action with variants, sizes, and states.'], Dialog:['Finestra modale con focus gestito e chiusura da tastiera.','Modal window with managed focus and keyboard dismissal.'], Input:['Campo di testo con label, hint, validazione e stati.','Text field with label, hint, validation, and states.'], Card:['Superficie componibile per contenuti correlati.','Composable surface for related content.'], Table:['Presentazione leggibile e responsive di dati strutturati.','Readable responsive presentation for structured data.'], Switch:['Controllo binario con semantica nativa.','Binary control with native semantics.'], Toast:['Feedback temporaneo non bloccante.','Temporary, non-blocking feedback.'], Tooltip:['Informazione contestuale accessibile da hover e focus.','Contextual information available on hover and focus.'], FileUpload:['Area accessibile per selezionare o trascinare file.','Accessible area for selecting or dropping files.'], EmptyState:['Stato vuoto con spiegazione e prossima azione.','Empty state with explanation and next action.'], ParticleLogo:['Il logo Gozion ricomposto in particelle colorate e interattive.','The Gozion logo rebuilt from colorful, interactive particles.']
  };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const root = document.documentElement;
  const main = $('#main');
  const sidebar = $('#sidebar-content');
  const slug = value => value
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
  const title = value => value.replace(/([A-Z])/g, ' $1').trim();
  const esc = value => value.replace(/[&<>]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[char]));
  const state = { locale: localStorage.getItem('gozion-locale') || 'it', framework: 'React', component: {} };
  const backgroundPreviewCleanups = new Set();
  const t = key => copy[state.locale][key] || key;
  const categoryNames = {it:{Layout:'Layout',Typography:'Tipografia',Forms:'Form',Selection:'Selezione',Navigation:'Navigazione',Overlay:'Overlay',Feedback:'Feedback','Data Display':'Visualizzazione dati',Media:'Media',Interaction:'Interazione',Effects:'Effetti',Utilities:'Utility',Particles:'Particellari'},en:{}};
  const particleEffect = name => (globalThis.GOZION_PARTICLE_EFFECTS || []).find(effect => effect.name === name);
  const categoryLabel = value => categoryNames[state.locale][value] || value;
  const items = Object.entries(groups).flatMap(([category,names]) => names.map(name => ({name, category, status: ['AnimatedBorder','Combobox','FileUpload','TreeView'].includes(name) ? 'beta' : 'stable'})));
  const findComponent = path => items.find(item => slug(item.name) === path);
  function description(item) {
    if (specialDescriptions[item.name]) return specialDescriptions[item.name][state.locale === 'it' ? 0 : 1];
    const cat = {
      it: {Typography:'Tipografia leggibile e coerente per ogni gerarchia.',Forms:'Controllo form accessibile, chiaro e pronto alla validazione.',Selection:'Selezione accessibile con stati immediatamente riconoscibili.',Navigation:'Navigazione prevedibile per orientarsi nel prodotto.',Overlay:'Livello contestuale con focus e tastiera gestiti.',Feedback:'Feedback di stato chiaro senza interrompere il flusso.','Data Display':'Presentazione compatta e leggibile delle informazioni.',Media:'Primitive per media responsive e accessibili.',Interaction:'Interazione con feedback visivo e da tastiera.',Effects:'Effetto visuale controllato interamente dai token.',Utilities:'Utility discreta per risolvere un compito specifico.',Layout:'Primitiva di layout responsiva e token-first.',Particles:'Visual interattivi costruiti con particelle.'},
      en: {Typography:'Readable, consistent typography for every hierarchy.',Forms:'Accessible form control ready for clear validation.',Selection:'Accessible selection with immediately recognizable states.',Navigation:'Predictable navigation through product surfaces.',Overlay:'Contextual layer with managed focus and keyboard behavior.',Feedback:'Clear status feedback without interrupting the flow.','Data Display':'Compact, readable presentation of information.',Media:'Responsive, accessible media primitive.',Interaction:'Interaction with visual and keyboard feedback.',Effects:'Visual effect controlled entirely through tokens.',Utilities:'Focused utility for a specific interface task.',Layout:'Responsive, token-first layout primitive.',Particles:'Interactive visuals built from particles.'}
    };
    return `${title(item.name)} — ${cat[state.locale][item.category]}`;
  }
  function icon(name) {
    const paths = {check:'M5 12l4 4L19 7',plus:'M12 5v14M5 12h14',search:'M20 20l-4-4m2-5a7 7 0 11-14 0 7 7 0 0114 0',close:'M6 6l12 12M18 6L6 18',chevron:'M8 10l4 4 4-4',info:'M12 8h.01M11 12h1v4h1',upload:'M12 16V4m0 0L7 9m5-5l5 5M5 20h14',star:'M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3'};
    return `<svg class="pv-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name] || paths.info}"/></svg>`;
  }
  function componentPreview(name, compact = false) {
    const c = compact ? ' compact' : '';
    const wrap = content => `<div class="pv pv-preview-${slug(name)}${c}" data-preview="${name}">${content}</div>`;
    const particle = particleEffect(name);
    if (particle) {
      // Every surface uses the actual exported React particle component. Gallery
      // cards are mounted only while near the viewport to avoid GPU exhaustion.
      return wrap(`<div class="pv-background-effect" data-background-effect="${particle.slug}" data-particle-preview="${compact ? 'card' : 'detail'}" aria-label="${particle.name}: ${particle.description}"></div>`);
    }
    switch (name) {
      case 'Box': return wrap('<div class="pv-box" aria-label="Empty Box container"></div>');
      case 'Flex': return wrap('<div class="pv-flex"><i></i><i></i><i></i></div>');
      case 'Stack': return wrap('<div class="pv-stack"><i></i><i></i><i></i></div>');
      case 'Grid': return wrap('<div class="pv-grid">'+('<i></i>'.repeat(6))+'</div>');
      case 'Center': return wrap('<div class="pv-center"><b>Centered</b></div>');
      case 'Container': return wrap('<div class="pv-container"><i></i><i></i><i></i></div>');
      case 'Divider': return wrap('<span>Profile</span><hr><span>Security</span>');
      case 'AspectRatio': return wrap('<div class="pv-ratio"><span>16 : 9</span></div>');
      case 'Text': return wrap('<p class="pv-text">Build products people enjoy using.</p>');
      case 'Heading': return wrap('<div><h3>Move ideas forward.</h3><span>Heading hierarchy</span></div>');
      case 'Link': return wrap('<a href="#" data-demo-link>Read documentation →</a>');
      case 'Kbd': return wrap(`<div class="pv-kbd-shortcut"><span>${state.locale === 'it' ? 'Premi' : 'Press'}</span><div data-kbd-output><kbd>⌘</kbd><i>+</i><kbd>K</kbd></div></div>`);
      case 'List': return wrap('<ul><li>Accessible by default</li><li>Token-first styling</li><li>Three frameworks</li></ul>');
      case 'Input': return wrap('<label class="pv-field"><span>Email</span><input placeholder="you@company.com"><small>We never share your email.</small></label>');
      case 'InputGroup': return wrap('<label class="pv-input-group"><span>https://</span><input value="gozion.dev"><button>Copy</button></label>');
      case 'Textarea': return wrap('<label class="pv-field"><span>Message</span><textarea placeholder="Write a short message…"></textarea><small>0 / 240</small></label>');
      case 'NumberInput': return wrap('<div class="pv-number"><button data-action="decrement">−</button><output data-number>3</output><button data-action="increment">+</button></div>');
      case 'PasswordInput': return wrap('<label class="pv-field"><span>Password</span><div class="pv-password"><input data-password type="password" value="gozion2026"><button data-action="password">Show</button></div></label>');
      case 'SearchInput': return wrap(`<label class="pv-search">${icon('search')}<input placeholder="Search workspace…"><kbd>⌘K</kbd></label>`);
      case 'OTPInput': return wrap('<div class="pv-pin">'+['4','8','2','6','1','9'].map(x=>`<input value="${x}" maxlength="1">`).join('')+'</div>');
      case 'PinInput': return wrap('<div class="pv-pin">'+['•','•','•',''].map(x=>`<input value="${x}" maxlength="1">`).join('')+'</div>');
      case 'FileUpload': return wrap(`<button class="pv-upload" data-action="upload">${icon('upload')}<b data-upload-label>Drop files or browse</b><small>PNG, JPG or PDF · 10 MB max</small></button>`);
      case 'FormControl': return wrap('<label class="pv-field"><span>Workspace name <em>*</em></span><input value="Acme design"><small class="pv-success">Looks good.</small></label>');
      case 'Checkbox': return wrap('<label class="pv-check"><input data-checkbox type="checkbox" checked><span>'+icon('check')+'</span>Remember this device</label>');
      case 'Radio': return wrap('<label class="pv-radio"><input data-radio type="radio" checked><span></span>Starter plan</label>');
      case 'RadioGroup': return wrap('<div class="pv-radio-group"><label class="pv-radio"><input data-radio-group value="monthly" name="plan" type="radio" checked><span></span>Monthly</label><label class="pv-radio"><input data-radio-group value="yearly" name="plan" type="radio"><span></span>Yearly <b>−20%</b></label></div>');
      case 'Switch': return wrap('<label class="pv-switch"><input data-switch type="checkbox" role="switch" checked><span aria-hidden="true"></span><b>Product updates</b></label>');
      case 'Select': return wrap('<label class="pv-field"><span>Role</span><select data-select><option value="designer">Product designer</option><option value="engineer">Engineer</option><option value="founder">Founder</option></select></label>');
      case 'MultiSelect': return wrap('<div class="pv-multiselect"><span>Design <button>×</button></span><span>Research <button>×</button></span><input placeholder="Add…"></div>');
      case 'Combobox': return wrap(`<div class="pv-combo"><label>${icon('search')}<input placeholder="Find a teammate…"></label><div><button><span class="pv-avatar">AM</span><b>Anna Moss</b><small>anna@gozion.dev</small></button><button><span class="pv-avatar alt">JL</span><b>Jon Lee</b><small>jon@gozion.dev</small></button></div></div>`);
      case 'Slider': return wrap('<label class="pv-slider"><span>Volume <output>68%</output></span><input data-slider type="range" value="68"></label>');
      case 'RangeSlider': return wrap('<label class="pv-slider"><span>Price range <output>€20 — €80</output></span><div class="pv-range-slider" style="--range-start:20%;--range-end:80%"><i aria-hidden="true"></i><input data-range-min aria-label="Minimum price" type="range" min="0" max="100" value="20"><input data-range-max aria-label="Maximum price" type="range" min="0" max="100" value="80"></div></label>');
      case 'Rating': return wrap('<div class="pv-rating" aria-label="4 out of 5 stars">'+[1,2,3,4,5].map(i=>`<button data-star="${i}" class="${i<5?'on':''}">${icon('star')}</button>`).join('')+'<output>4.0</output></div>');
      case 'SegmentedControl': return wrap('<div class="pv-segment" role="radiogroup" aria-label="Time range"><button type="button" data-segment-value="day" class="active" role="radio" aria-checked="true">Day</button><button type="button" data-segment-value="week" role="radio" aria-checked="false">Week</button><button type="button" data-segment-value="month" role="radio" aria-checked="false">Month</button></div>');
      case 'Toggle': return wrap(`<button class="pv-toggle active" data-action="toggle">${icon('star')} Favorite</button>`);
      case 'ToggleGroup': return wrap('<div class="pv-toggle-group" role="radiogroup" aria-label="Text formatting"><button type="button" role="radio" data-toggle-value="bold" class="active" aria-checked="true"><b>B</b><span class="ui-sr-only">Bold</span></button><button type="button" role="radio" data-toggle-value="italic" aria-checked="false"><i>I</i><span class="ui-sr-only">Italic</span></button><button type="button" role="radio" data-toggle-value="underline" aria-checked="false"><u>U</u><span class="ui-sr-only">Underline</span></button></div>');
      case 'Navbar': return wrap(`<nav class="pv-navbar"><b><i>G</i> Gozion</b><span>Product</span><span>Solutions</span><button>${compact?'Log in':'Get started'}</button></nav>`);
      case 'Sidebar': return wrap(`<aside class="pv-sidebar"><b>Workspace</b><button class="active">${icon('info')}Overview</button><button>${icon('star')}Projects</button><button>${icon('plus')}Create</button></aside>`);
      case 'Breadcrumb': return wrap('<nav class="pv-breadcrumb"><a>Docs</a><i>›</i><a>Components</a><i>›</i><b>Breadcrumb</b></nav>');
      case 'Tabs': return wrap('<div class="pv-tabs"><nav><button class="active">Overview</button><button>Activity</button><button>Settings</button></nav><p>Workspace overview content</p></div>');
      case 'Pagination': return wrap('<nav class="pv-pagination"><button>‹</button><button class="active">1</button><button>2</button><button>3</button><span>…</span><button>8</button><button>›</button></nav>');
      case 'Stepper': return wrap('<ol class="pv-stepper"><li class="done"><i>✓</i><span>Account</span></li><li class="active"><i>2</i><span>Profile</span></li><li><i>3</i><span>Finish</span></li></ol>');
      case 'TreeView': return wrap('<div class="pv-tree"><button>⌄ src</button><button class="child">⌄ components</button><button class="leaf">◇ Button.tsx</button><button class="leaf">◇ Input.tsx</button></div>');
      case 'Dialog': return wrap('<button class="pv-button" data-action="dialog">Open dialog</button><div class="pv-overlay-card" data-overlay hidden><div><b>Publish changes?</b><p>Your update will be visible to everyone.</p><footer><button data-action="close-overlay">Cancel</button><button class="primary" data-action="close-overlay">Publish</button></footer></div></div>');
      case 'AlertDialog': return wrap('<button class="pv-button danger" data-action="dialog">Delete project</button><div class="pv-overlay-card" data-overlay hidden><div><b>Delete project?</b><p>This action cannot be undone.</p><footer><button data-action="close-overlay">Cancel</button><button class="danger" data-action="close-overlay">Delete</button></footer></div></div>');
      case 'Drawer': return wrap('<button class="pv-button" data-action="dialog">Open drawer</button><div class="pv-overlay-backdrop" data-overlay hidden><aside class="pv-drawer"><button data-action="close-overlay">×</button><b>Notifications</b><p>You are all caught up.</p></aside></div>');
      case 'Modal': return wrap('<button class="pv-button" data-action="dialog">Open modal</button><div class="pv-overlay-card" data-overlay hidden><div><button class="pv-x" data-action="close-overlay">×</button><b>Invite your team</b><p>Collaborate in the same workspace.</p><input placeholder="name@company.com"></div></div>');
      case 'Sheet': return wrap('<button class="pv-button" data-action="dialog">Open sheet</button><div class="pv-overlay-backdrop" data-overlay hidden><section class="pv-sheet"><i></i><b>Quick actions</b><button>Create project</button><button>Invite member</button></section></div>');
      case 'Popover': return wrap('<div class="pv-popover"><button class="pv-button" data-action="popover">Share</button><div data-popover hidden><b>Share workspace</b><input value="gozion.dev/acme"><button>Copy link</button></div></div>');
      case 'Tooltip': return wrap('<div class="pv-tooltip"><button aria-describedby="demo-tooltip">?</button><span id="demo-tooltip" role="tooltip">Open help center</span></div>');
      case 'DropdownMenu': return wrap('<div class="pv-menu"><button class="pv-button" data-action="menu">Options '+icon('chevron')+'</button><div data-menu hidden><button>Edit</button><button>Duplicate</button><hr><button class="danger">Delete</button></div></div>');
      case 'ContextMenu': return wrap('<div class="pv-context" tabindex="0" data-action="context">Right click this area<div data-context hidden><button>Copy</button><button>Rename</button><button>Archive</button></div></div>');
      case 'HoverCard': return wrap('<div class="pv-hover-card"><a tabindex="0">@gozion</a><div><img class="pv-brand-image" src="./src/assets/gozion-mark.png" alt="Gozion UI"><b>Gozion UI</b><p>Multi-framework components that stay yours.</p><small>2.4k followers</small></div></div>');
      case 'Alert': return wrap(`<div class="pv-alert">${icon('info')}<div><b>New version available</b><p>Update when it works for your team.</p></div><button>Review</button></div>`);
      case 'Toast': return wrap(`<button class="pv-button" data-action="toast">Show toast</button><div class="pv-toast" data-toast hidden>${icon('check')}<div><b>Changes saved</b><small>Your workspace is up to date.</small></div><button data-action="close-toast">×</button></div>`);
      case 'Progress': return wrap('<div class="pv-progress"><span>Uploading assets <output>72%</output></span><i><b style="width:72%"></b></i></div>');
      case 'Spinner': return wrap('<div class="pv-spinner"><i></i><span>Syncing workspace…</span></div>');
      case 'Skeleton': return wrap('<div class="pv-skeleton"><i class="avatar"></i><span><i></i><i></i></span></div>');
      case 'LoadingOverlay': return wrap('<div class="pv-loading"><div><span>Quarterly report</span><small>12 collaborators</small></div><i></i><b>Updating…</b></div>');
      case 'EmptyState': return wrap(`<div class="pv-empty">${icon('plus')}<b>No projects yet</b><p>Create your first project to get started.</p><button>Create project</button></div>`);
      case 'Status': return wrap('<div class="pv-status"><i></i><b>All systems operational</b><span>Updated 2 min ago</span></div>');
      case 'Accordion': return wrap('<div class="pv-accordion"><details open><summary>Can I customize every token?</summary><p>Yes. Semantic CSS variables control the whole system.</p></details><details><summary>Does it support dark mode?</summary><p>Light, dark and system modes are included.</p></details></div>');
      case 'Avatar': return wrap('<div class="pv-avatar-card"><span class="pv-avatar large">NV</span><div><b>Nicola Viola</b><small>Product engineer</small></div></div>');
      case 'AvatarGroup': return wrap('<div class="pv-avatar-group"><span>AM</span><span>JL</span><span>SK</span><span>+8</span></div>');
      case 'Badge': return wrap('<div class="pv-badges"><span>Stable</span><span class="success">Live</span><span class="warning">Beta</span></div>');
      case 'Card': return wrap(`<article class="pv-card"><header><span>Revenue</span><button aria-label="Card actions" data-action="card-menu">•••</button><div class="pv-card-menu" data-card-menu hidden><button>View report</button><button>Duplicate</button><button class="danger">Remove</button></div></header><strong>€24,780</strong><small>↗ 12.4% this month</small><div class="pv-chart"><i></i><i></i><i></i><i></i><i></i></div></article>`);
      case 'Chip': return wrap('<div class="pv-chips"><button>Design ×</button><button>Product ×</button><button class="add">+ Add filter</button></div>');
      case 'Table': return wrap(`<div class="pv-table"><div class="pv-table-toolbar"><div><b>Team members</b><small>Manage access and roles</small></div><button>${icon('plus')} Invite</button></div><div class="pv-table-head"><span>Member</span><span>Role</span><span>Status</span><span></span></div><div class="pv-table-row"><span><i>AM</i><b>Anna Moss<small>anna@gozion.dev</small></b></span><span>Designer</span><em>Active</em><button aria-label="Actions">•••</button></div><div class="pv-table-row"><span><i class="alt">JL</i><b>Jon Lee<small>jon@gozion.dev</small></b></span><span>Engineer</span><em>Active</em><button aria-label="Actions">•••</button></div><footer><span>2 members</span><div><button disabled>Previous</button><button>Next</button></div></footer></div>`);
      case 'Tag': return wrap('<div class="pv-tags"><span>React</span><span>Vue 3</span><span>Angular</span></div>');
      case 'Timeline': return wrap('<ol class="pv-timeline"><li><i></i><b>Deployment complete</b><small>Just now</small></li><li><i></i><b>Build passed</b><small>3 min ago</small></li><li><i></i><b>Commit pushed</b><small>8 min ago</small></li></ol>');
      case 'Icon': return wrap(`<div class="pv-icons">${icon('plus')}${icon('search')}${icon('star')}${icon('check')}</div>`);
      case 'Image': return wrap('<figure class="pv-image"><div><span>GOZION</span></div><figcaption>Abstract systems · 2026</figcaption></figure>');
      case 'Button': return wrap('<button class="pv-button primary">Create workspace</button>');
      case 'ButtonGroup': return wrap('<div class="pv-button-group"><button>Back</button><button class="primary">Continue</button></div>');
      case 'IconButton': return wrap(`<button class="pv-icon-button" aria-label="Add item">${icon('plus')}</button>`);
      case 'CloseButton': return wrap(`<button class="pv-icon-button" aria-label="Close">${icon('close')}</button>`);
      case 'Pressable': return wrap('<button class="pv-pressable"><i>⌘</i><span><b>Open command menu</b><small>Press to explore actions</small></span><kbd>K</kbd></button>');
      case 'Hoverable': return wrap('<article class="pv-hoverable"><span>Interactive surface</span><b>Move your pointer here →</b></article>');
      case 'ScrollArea': return wrap('<div class="pv-scroll">'+['Strategy notes','Design review','Launch checklist','Customer research','Analytics report'].map(x=>`<p><i></i><span>${x}</span></p>`).join('')+'</div>');
      case 'GlassSurface': return wrap('<div class="pv-effect glass"><b>Glass surface</b><small>Backdrop, border and contrast.</small></div>');
      case 'GradientSurface': return wrap('<div class="pv-effect gradient"><b>Gradient surface</b><small>Semantic color stops.</small></div>');
      case 'Glow': return wrap('<div class="pv-effect glow"><i></i><b>Focused energy</b></div>');
      case 'BlurSurface': return wrap('<div class="pv-effect blur"><b>Blurred context</b><small>Content remains legible.</small></div>');
      case 'AnimatedBorder': return wrap('<div class="pv-effect animated"><b>Live connection</b><small>Animated token border.</small></div>');
      case 'Shine': return wrap('<button class="pv-effect shine"><b>Upgrade plan</b></button>');
      case 'Spotlight': return wrap('<div class="pv-effect spotlight"><i></i><b>Pointer spotlight</b></div>');
      case 'Mask': return wrap('<div class="pv-effect mask"><b>MASK</b></div>');
      case 'Overlay': return wrap('<div class="pv-overlay-demo"><div></div><b>Readable overlay</b><small>48% neutral scrim</small></div>');
      case 'Collapsible': return wrap('<div class="pv-collapsible"><button data-action="collapse">Advanced settings <span>⌄</span></button><div data-collapse><label>Telemetry <input type="checkbox" checked></label></div></div>');
      case 'CopyButton': return wrap('<div class="pv-copy"><code>npm i @gozion-ui/react</code><button data-copy-value="npm i @gozion-ui/react">Copy</button></div>');
      case 'VisuallyHidden': return wrap('<div class="pv-visually-hidden"><span aria-hidden="true">🔊</span><div><b>Screen-reader label</b><small>“Play notification sound”</small></div></div>');
      case 'ParticleLogo': return wrap('<canvas class="pv-particle-logo" data-particle-logo aria-label="Gozion particle logo"></canvas>');
      default: return wrap(`<strong>${title(name)}</strong>`);
    }
  }
  function codeExample(name, props = {}) {
    if (name === 'Kbd') {
      const keys = props.keys || [props.modifier,props.key1,props.key2,props.key3].filter(Boolean);
      return kbdCode(keys.length ? keys : ['⌘','K']);
    }
    const particle = particleEffect(name);
    if (particle) {
      const controls = getParticleControls(particle.slug);
      const values = Object.fromEntries(controls.filter(control => control.type !== 'colors').map(control => [control.prop, props[control.prop] ?? control.value]));
      const colorGroup = controls.find(control => control.type === 'colors');
      if (colorGroup) values[particle.slug === 'ballpit' ? 'colors' : colorGroup.prop] = props[particle.slug === 'ballpit' ? 'colors' : colorGroup.prop] ?? colorGroup.value;
      const itemList = value => String(value).split(',').map(item => item.trim()).filter(Boolean);
      const reactValue = (value, key) => key === 'items' && particle.slug === 'grid-motion' && typeof value === 'string'
        ? `{[${itemList(value).map(item => `'${quote(item)}'`).join(', ')}]}`
        : typeof value === 'boolean' ? `{${value}}` : typeof value === 'number' ? `{${value}}` : Array.isArray(value) ? `{[${value.map(item => typeof item === 'string' ? `'${item}'` : item).join(', ')}]}` : `"${value}"`;
      const attrs = Object.entries(values).map(([key,value]) => `${key}=${reactValue(value, key)}`).join(' ');
      const frameworkParticleValue = (key, value) => key === 'items' && particle.slug === 'grid-motion' && typeof value === 'string' ? JSON.stringify(itemList(value)) : (Array.isArray(value) ? JSON.stringify(value) : value);
      if (state.framework === 'Vue') return `<${name} ${Object.entries(values).map(([key,value]) => typeof value === 'string' && key !== 'items' ? `${key}="${value}"` : `:${key}="${frameworkParticleValue(key, value)}"`).join(' ')} />`;
      if (state.framework === 'Angular') return `<ui-${slug(name)} ${Object.entries(values).map(([key,value]) => typeof value === 'string' && key !== 'items' ? `${key}="${value}"` : `[${key}]="${frameworkParticleValue(key, value)}"`).join(' ')}></ui-${slug(name)}>`;
      const examples = {
        'grid-distortion': `<GridDistortion imageSrc="/images/product-canvas.jpg" grid={18} strength={0.22} mouse={0.16} relaxation={0.9} />`,
        ballpit: `<Ballpit count={72} colors={[0x8b5cf6, 0x22d3ee, 0xf472b6]} gravity={0.35} followCursor />`,
        orb: `<Orb hue={220} hoverIntensity={0.35} rotateOnHover backgroundColor="#090c14" />`,
        galaxy: `<Galaxy hueShift={220} starSpeed={0.5} density={1.2} mouseInteraction />`,
        'dot-field': `<DotField gradientFrom="#a855f7" gradientTo="#38bdf8" dotSpacing={14} cursorForce={0.1} />`
      };
      return props && Object.keys(props).length ? `<${name} ${attrs} />` : (examples[particle.slug] || `<${name} />`);
    }
    if (name === 'Table') {
      if (state.framework === 'Vue') return `<script setup>\nconst columns = [{ key: 'member', label: 'Member' }, { key: 'role', label: 'Role' }, { key: 'status', label: 'Status' }]\nconst rows = [{ member: 'Anna Moss', role: 'Designer', status: 'Active' }]\n</script>\n<Table :columns="columns" :rows="rows" @row-click="openMember" />`;
      if (state.framework === 'Angular') return `<ui-table [columns]="columns" [rows]="members" (rowClick)="openMember($event)"></ui-table>`;
      return `const columns = [\n  { key: 'member', header: 'Member' },\n  { key: 'role', header: 'Role' },\n  { key: 'status', header: 'Status' },\n];\nconst rows = [\n  { id: 'anna', member: 'Anna Moss', role: 'Designer', status: 'Active' },\n];\n\n<Table columns={columns} rows={rows} rowActions={(row) => openMenu(row)} onRowClick={openMember} />`;
    }
    if (name === 'Card') {
      if (state.framework === 'Vue') return `<Card>\n  <template #title>Analytics</template>\n  <template #actions><Button>•••</Button></template>\n  <CardContent>Revenue this month: €24,780</CardContent>\n</Card>`;
      if (state.framework === 'Angular') return `<ui-card>\n  <span card-title>Analytics</span>\n  <ui-card-menu card-actions><button card-menu-item>•••</button></ui-card-menu>\n  Revenue this month: €24,780\n</ui-card>`;
      return `<Card title="Analytics" actions={<CardMenu><CardMenuItem onClick={openReport}>View report</CardMenuItem><CardMenuItem>Duplicate</CardMenuItem></CardMenu>}>\n  <CardContent>Revenue this month: €24,780</CardContent>\n</Card>`;
    }
    if (name === 'Button') {
      if (state.framework === 'Vue') return `<Button @click="continueFlow"><Icon name="arrow-right" /> Continue</Button>`;
      if (state.framework === 'Angular') return `<ui-button (click)="continueFlow()"><ui-icon name="arrow-right"></ui-icon> Continue</ui-button>`;
      return `<Button onClick={continueFlow} loading={isSubmitting}>\n  <Icon name="arrow-right" /> Continue\n</Button>`;
    }
    if (name === 'Input') {
      const label = props.label || 'Email', hint = props.hint || "We never share your email.", placeholder = props.placeholder || 'you@company.com';
      const common = componentCodeProps(props, new Set(['label','hint','placeholder']));
      if (state.framework === 'Vue') return `<FormControl label="${quote(label)}" hint="${quote(hint)}">\n  <Input v-model="email" placeholder="${quote(placeholder)}"${vueAttrs(common)} />\n</FormControl>`;
      if (state.framework === 'Angular') return `<ui-form-control label="${quote(label)}" hint="${quote(hint)}"><ui-input [(value)]="email" placeholder="${quote(placeholder)}"${angularAttrs(common)}></ui-input></ui-form-control>`;
      return `<FormControl label="${quote(label)}" hint="${quote(hint)}">\n  <Input value={email} onChange={event => setEmail(event.target.value)} placeholder="${quote(placeholder)}"${reactAttrs(common)} />\n</FormControl>`;
    }
    if (name === 'Select') {
      const value = props.value || 'designer';
      if (state.framework === 'Vue') return `<script setup>\nimport { ref } from 'vue'\nconst role = ref('${value}')\n</script>\n\n<Select v-model="role" :options="roles" label="Role" />`;
      if (state.framework === 'Angular') return `role = '${value}';\n\n<ui-select [options]="roles" [(value)]="role" label="Role"></ui-select>`;
      return `const [role, setRole] = useState('${value}');\n\n<Select label="Role" options={roles} value={role} onChange={setRole} />`;
    }
    if (name === 'Dialog') {
      if (state.framework === 'Vue') return `<Dialog v-model:open="open" title="Publish changes" @close="open = false">\n  <DialogFooter><Button @click="publish">Publish</Button></DialogFooter>\n</Dialog>`;
      if (state.framework === 'Angular') return `<ui-dialog [open]="open" title="Publish changes" (close)="open = false">\n  <ui-button dialog-action (click)="publish()">Publish</ui-button>\n</ui-dialog>`;
      return `<Dialog open={open} onClose={() => setOpen(false)} title="Publish changes">\n  <DialogFooter><Button onClick={publish}>Publish</Button></DialogFooter>\n</Dialog>`;
    }
    if (name === 'Tabs') {
      if (state.framework === 'Vue') return `<Tabs v-model="activeTab" :items="tabs" @change="onTabChange" />`;
      if (state.framework === 'Angular') return `<ui-tabs [items]="tabs" [(active)]="activeTab" (change)="onTabChange($event)"></ui-tabs>`;
      return `<Tabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />`;
    }
    if (name === 'Alert') {
      if (state.framework === 'Vue') return `<Alert tone="success" title="Saved" description="Your changes are live." action="View" @action="openReport" />`;
      if (state.framework === 'Angular') return `<ui-alert tone="success" title="Saved" description="Your changes are live." (action)="openReport()"></ui-alert>`;
      return `<Alert tone="success" title="Saved" description="Your changes are live." action="View" onAction={openReport} />`;
    }
    if (name === 'Avatar') {
      if (state.framework === 'Vue') return `<Avatar :src="user.avatar" fallback="AM" alt="Anna Moss" />`;
      if (state.framework === 'Angular') return `<ui-avatar [src]="user.avatar" fallback="AM" alt="Anna Moss"></ui-avatar>`;
      return `<Avatar src={user.avatar} fallback="AM" alt="Anna Moss" />`;
    }
    const attrs = Object.entries(props).filter(([,v]) => v !== false).map(([key,value]) => value === true ? key : `${key}="${value}"`).join(' ');
    const child = ['Input','Textarea','Select','Image','Spinner','Divider'].includes(name) ? '' : (state.locale === 'it' ? 'Contenuto' : 'Content');
    if (state.framework === 'Angular') return `<ui-${slug(name)}${attrs ? ' '+attrs : ''}>${child}</ui-${slug(name)}>`;
    return `<${name}${attrs ? ' '+attrs : ''}>${child}</${name}>`;
  }
  function componentCodeProps(props, omitted = new Set()) {
    return Object.fromEntries(Object.entries(props).filter(([key, value]) => !omitted.has(key) && value !== '' && value !== undefined && value !== false));
  }
  const quote = value => String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  function reactAttrs(props) { return Object.entries(props).map(([key,value]) => value === true ? ` ${key}` : typeof value === 'number' ? ` ${key}={${value}}` : ` ${key}="${quote(value)}"`).join(''); }
  function vueAttrs(props) { return Object.entries(props).map(([key,value]) => value === true ? ` :${key}="true"` : typeof value === 'number' ? ` :${key}="${value}"` : ` ${key}="${quote(value)}"`).join(''); }
  function angularAttrs(props) { return Object.entries(props).map(([key,value]) => typeof value === 'boolean' || typeof value === 'number' ? ` [${key}]="${value}"` : ` ${key}="${quote(value)}"`).join(''); }
  function liveCodeExample(item, props) {
    if (item.name === 'RangeSlider') return rangeSliderCode(props.value || [20,80], Boolean(props.disabled));
    if (item.name === 'SegmentedControl') return segmentedCode(props.value || 'day', Boolean(props.disabled));
    if (['Checkbox','Radio','RadioGroup','Slider'].includes(item.name)) return valueCode(item.name, props);
    if (item.name === 'Switch') return switchCode(Boolean(props.checked), Boolean(props.disabled));
    if (item.name === 'ToggleGroup') return toggleGroupCode(props.value || 'bold', Boolean(props.disabled));
    if (item.name === 'Input' || item.name === 'Table' || particleEffect(item.name) || item.name === 'Kbd') return codeExample(item.name, props);
    const child = props.children || '';
    const values = componentCodeProps(props, new Set(['children']));
    if (state.framework === 'Vue') return `<${item.name}${vueAttrs(values)}>${child}</${item.name}>`;
    if (state.framework === 'Angular') return `<ui-${slug(item.name)}${angularAttrs(values)}>${child}</ui-${slug(item.name)}>`;
    return `<${item.name}${reactAttrs(values)}>${child}</${item.name}>`;
  }
  function previewProps(item) {
    const controls = $('.preview-controls');
    const props = Object.fromEntries($$('[data-option]', controls).map(input => [input.dataset.option, input.type === 'checkbox' ? input.checked : input.value]));
    const slots = $('#component-preview')._textSlots || [];
    slots.forEach(slot => { props[slot.prop] = slot.get(); });
    if (item.name === 'Switch') props.checked = Boolean($('[data-switch]', $('#component-preview'))?.checked);
    if (item.name === 'Checkbox') props.checked = Boolean($('[data-checkbox]', $('#component-preview'))?.checked);
    if (item.name === 'Radio') props.checked = Boolean($('[data-radio]', $('#component-preview'))?.checked);
    if (item.name === 'RadioGroup') props.value = $('[data-radio-group]:checked', $('#component-preview'))?.value || 'monthly';
    if (item.name === 'Select') props.value = $('[data-select]', $('#component-preview'))?.value || 'designer';
    if (item.name === 'Slider') props.value = Number($('[data-slider]', $('#component-preview'))?.value || 68);
    if (item.name === 'RangeSlider') props.value = [Number($('[data-range-min]', $('#component-preview'))?.value || 20),Number($('[data-range-max]', $('#component-preview'))?.value || 80)];
    if (item.name === 'SegmentedControl') props.value = $('[data-segment-value].active', $('#component-preview'))?.dataset.segmentValue || 'day';
    if (item.name === 'ToggleGroup') props.value = $('[data-toggle-value].active', $('#component-preview'))?.dataset.toggleValue || 'bold';
    if (item.name === 'Kbd') props.keys = [props.modifier,props.key1,props.key2,props.key3].filter(Boolean);
    return props;
  }
  function syncFrameworkCode(item) {
    if (state.framework === 'Preview') return;
    $('#framework-content').innerHTML = codeBlock(liveCodeExample(item, previewProps(item)));
  }
  function switchCode(checked, disabled) {
    const disabledReact = disabled ? ' disabled' : '';
    const disabledVue = disabled ? ' :disabled="true"' : '';
    const disabledAngular = disabled ? ' [disabled]="true"' : '';
    if (state.framework === 'Vue') return `<script setup>\nimport { ref } from 'vue'\n\nconst enabled = ref(${checked})\n</script>\n\n<template>\n  <Switch v-model:checked="enabled"${disabledVue}>Product updates</Switch>\n</template>`;
    if (state.framework === 'Angular') return `enabled = ${checked};\n\n<ui-switch [(checked)]="enabled"${disabledAngular}>Product updates</ui-switch>`;
    return `const [enabled, setEnabled] = useState(${checked});\n\n<Switch checked={enabled} onChange={setEnabled} label="Product updates"${disabledReact} />`;
  }
  function valueCode(name, props) {
    const key = name === 'Checkbox' || name === 'Radio' ? 'checked' : 'value';
    const value = props[key]; const literal = typeof value === 'string' ? `'${value}'` : value;
    const callback = key === 'checked' ? 'onChange' : 'onValueChange';
    if (state.framework === 'Vue') return `<${name} v-model:${key}="model" />`;
    if (state.framework === 'Angular') return `<ui-${slug(name)} [(${key})]="model"></ui-${slug(name)}>`;
    return `const [model, setModel] = useState(${literal});\n\n<${name} ${key}={model} ${callback}={setModel} />`;
  }
  function rangeSliderCode(value, disabled) {
    const [min,max] = value;
    if (state.framework === 'Vue') return `<script setup>\nimport { ref } from 'vue'\nconst priceRange = ref([${min}, ${max}])\n</script>\n\n<RangeSlider v-model="priceRange" min="0" max="100"${disabled ? ' :disabled="true"' : ''} />`;
    if (state.framework === 'Angular') return `priceRange = [${min}, ${max}];\n\n<ui-range-slider [(value)]="priceRange" [min]="0" [max]="100"${disabled ? ' [disabled]="true"' : ''}></ui-range-slider>`;
    return `const [priceRange, setPriceRange] = useState([${min}, ${max}]);\n\n<RangeSlider value={priceRange} onValueChange={setPriceRange} min={0} max={100}${disabled ? ' disabled' : ''} />`;
  }
  function segmentedCode(value, disabled) {
    const options = `[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }]`;
    if (state.framework === 'Vue') return `<script setup>\nimport { ref } from 'vue'\nconst period = ref('${value}')\nconst options = ${options}\n</script>\n\n<SegmentedControl v-model="period" :options="options"${disabled ? ' :disabled="true"' : ''} />`;
    if (state.framework === 'Angular') return `period = '${value}';\noptions = ${options};\n\n<ui-segmented-control [(value)]="period" [options]="options"${disabled ? ' [disabled]="true"' : ''}></ui-segmented-control>`;
    return `const [period, setPeriod] = useState('${value}');\nconst options = ${options};\n\n<SegmentedControl value={period} onValueChange={setPeriod} options={options}${disabled ? ' disabled' : ''} />`;
  }
  function toggleGroupCode(value, disabled) {
    const disabledReact = disabled ? ' disabled' : '';
    const disabledVue = disabled ? ' :disabled="true"' : '';
    const disabledAngular = disabled ? ' [disabled]="true"' : '';
    const options = `[{ value: 'bold', label: 'Bold' }, { value: 'italic', label: 'Italic' }, { value: 'underline', label: 'Underline' }]`;
    if (state.framework === 'Vue') return `<script setup>\nimport { ref } from 'vue'\n\nconst format = ref('${value}')\nconst options = ${options}\n</script>\n\n<template>\n  <ToggleGroup v-model="format" :options="options" aria-label="Text formatting"${disabledVue} />\n</template>`;
    if (state.framework === 'Angular') return `format = '${value}';\noptions = ${options};\n\n<ui-toggle-group [(value)]="format" [options]="options" aria-label="Text formatting"${disabledAngular}></ui-toggle-group>`;
    return `const [format, setFormat] = useState('${value}');\nconst options = ${options};\n\n<ToggleGroup value={format} onValueChange={setFormat} options={options} aria-label="Text formatting"${disabledReact} />`;
  }
  function kbdCode(keys) {
    if (state.framework === 'Vue') return `<span class="ui-kbd-shortcut">\n  ${keys.map(key => `<Kbd>${key}</Kbd>`).join(' + ')}\n</span>`;
    if (state.framework === 'Angular') return `<span class="ui-kbd-shortcut">\n  ${keys.map(key => `<ui-kbd>${key}</ui-kbd>`).join(' + ')}\n</span>`;
    return `<span className="ui-kbd-shortcut">\n  ${keys.map(key => `<Kbd>${key}</Kbd>`).join(' + ')}\n</span>`;
  }
  function codeBlock(value) { return `<pre class="code-block"><code>${esc(value)}</code><button class="copy-code" data-copy-code>${t('copy')}</button></pre>`; }
  // Particle controls intentionally describe real component props.  They are
  // not the generic component chrome controls used by the rest of the docs.
  const particleControls = {
    'grid-distortion': [{prop:'grid',label:'Grid resolution',type:'range',min:8,max:36,step:1,value:18},{prop:'strength',label:'Distortion',type:'range',min:.02,max:.6,step:.01,value:.22},{prop:'mouse',label:'Cursor radius',type:'range',min:.03,max:.5,step:.01,value:.16},{prop:'relaxation',label:'Relaxation',type:'range',min:.72,max:.98,step:.01,value:.9}],
    'grid-motion': [{prop:'items',label:'Items (comma separated)',type:'text',value:'Gozion, React, Vue, Angular, Tokens, Themes, Motion, A11y'},{prop:'gradientColor',label:'Ambient gradient',type:'color',value:'#5b55e7'},{prop:'itemBackground',label:'Card background',type:'color',value:'#11131b'},{prop:'rows',label:'Rows',type:'range',min:2,max:6,step:1,value:4},{prop:'columns',label:'Columns',type:'range',min:3,max:9,step:1,value:7},{prop:'gap',label:'Grid gap',type:'range',min:4,max:28,step:1,value:12}],
    ballpit: [{prop:'count',label:'Sphere count',type:'range',min:20,max:160,step:1,value:72},{prop:'gravity',label:'Gravity',type:'range',min:0,max:1.2,step:.05,value:.35},{prop:'ballColors',label:'Sphere colours',type:'colors',value:['#8b5cf6','#22d3ee','#f472b6']},{prop:'ambientColor',label:'Ambient light',type:'color',value:'#1c2748'},{prop:'lightIntensity',label:'Light intensity',type:'range',min:20,max:420,step:5,value:200},{prop:'canvasBackground',label:'Canvas background',type:'color',value:'#090c14'},{prop:'followCursor',label:'Follow cursor',type:'check',value:true}],
    aurora: [{prop:'colorStops',label:'Aurora colours',type:'colors',value:['#5227ff','#7cff67','#22d3ee']},{prop:'amplitude',label:'Wave amplitude',type:'range',min:.1,max:2.5,step:.05,value:1},{prop:'blend',label:'Colour blend',type:'range',min:0,max:1,step:.05,value:.5},{prop:'speed',label:'Flow speed',type:'range',min:.1,max:3,step:.05,value:1}],
    orb: [{prop:'hue',label:'Orb hue',type:'range',min:0,max:360,step:1,value:0},{prop:'hoverIntensity',label:'Hover energy',type:'range',min:0,max:1,step:.05,value:.35},{prop:'rotateOnHover',label:'Rotate on hover',type:'check',value:true},{prop:'backgroundColor',label:'Canvas background',type:'color',value:'#090c14'}],
    galaxy: [{prop:'hueShift',label:'Star hue',type:'range',min:0,max:360,step:1,value:140},{prop:'starSpeed',label:'Star speed',type:'range',min:0,max:2,step:.05,value:.5},{prop:'density',label:'Star density',type:'range',min:.3,max:2.5,step:.1,value:1.2},{prop:'mouseInteraction',label:'Pointer parallax',type:'check',value:true}],
    'dot-field': [{prop:'gradientFrom',label:'Gradient start',type:'color',value:'#a855f7'},{prop:'gradientTo',label:'Gradient end',type:'color',value:'#38bdf8'},{prop:'dotSpacing',label:'Dot spacing',type:'range',min:8,max:32,step:1,value:14},{prop:'cursorForce',label:'Cursor force',type:'range',min:0,max:.5,step:.01,value:.1}],
    'dot-grid': [{prop:'baseColor',label:'Base dot color',type:'color',value:'#4f46e5'},{prop:'activeColor',label:'Active dot color',type:'color',value:'#22d3ee'},{prop:'gap',label:'Grid gap',type:'range',min:12,max:56,step:1,value:32},{prop:'proximity',label:'Cursor radius',type:'range',min:60,max:280,step:5,value:150}],
    'pixel-snow': [{prop:'color',label:'Flake color',type:'color',value:'#dbeafe'},{prop:'speed',label:'Fall speed',type:'range',min:.1,max:3,step:.05,value:1.25},{prop:'density',label:'Density',type:'range',min:.05,max:1,step:.05,value:.3},{prop:'flakeSize',label:'Flake size',type:'range',min:.002,max:.05,step:.002,value:.01}],
    lightning: [{prop:'hue',label:'Bolt hue',type:'range',min:0,max:360,step:1,value:230},{prop:'speed',label:'Flicker speed',type:'range',min:.1,max:3,step:.05,value:1},{prop:'intensity',label:'Glow intensity',type:'range',min:.1,max:3,step:.05,value:1}],
    waves: [{prop:'lineColor',label:'Line color',type:'color',value:'#8b5cf6'},{prop:'backgroundColor',label:'Background',type:'color',value:'#090c14'},{prop:'waveSpeedX',label:'Wave speed',type:'range',min:.002,max:.05,step:.002,value:.012},{prop:'waveAmpX',label:'Wave amplitude',type:'range',min:4,max:64,step:1,value:32}],
    radar: [{prop:'color',label:'Radar color',type:'color',value:'#22d3ee'},{prop:'speed',label:'Rotation speed',type:'range',min:.1,max:3,step:.05,value:1},{prop:'sweepWidth',label:'Sweep width',type:'range',min:.05,max:1,step:.05,value:.35},{prop:'enableMouseInteraction',label:'Pointer interaction',type:'check',value:true}],
    'shape-grid': [{prop:'borderColor',label:'Grid color',type:'color',value:'#8b5cf6'},{prop:'hoverFillColor',label:'Hover fill',type:'color',value:'#22d3ee'},{prop:'speed',label:'Motion speed',type:'range',min:.1,max:3,step:.05,value:1},{prop:'squareSize',label:'Cell size',type:'range',min:18,max:80,step:1,value:40}],
    'faulty-terminal': [{prop:'tint',label:'Terminal tint',type:'color',value:'#8b5cf6'},{prop:'timeScale',label:'Animation speed',type:'range',min:.1,max:3,step:.05,value:1},{prop:'glitchAmount',label:'Glitch amount',type:'range',min:0,max:2,step:.05,value:.3},{prop:'mouseReact',label:'Pointer response',type:'check',value:true}],
    'hyperspeed': [{prop:'speed',label:'Travel speed',type:'range',min:.1,max:3,step:.05,value:1},{prop:'followMouse',label:'Follow cursor',type:'check',value:true}],
    'soft-aurora': [{prop:'color1',label:'Aurora color A',type:'color',value:'#8b5cf6'},{prop:'color2',label:'Aurora color B',type:'color',value:'#22d3ee'},{prop:'speed',label:'Flow speed',type:'range',min:.1,max:3,step:.05,value:1},{prop:'brightness',label:'Brightness',type:'range',min:.1,max:3,step:.05,value:1}],
    plasma: [{prop:'color',label:'Plasma color',type:'color',value:'#8b5cf6'},{prop:'speed',label:'Flow speed',type:'range',min:.1,max:3,step:.05,value:1},{prop:'scale',label:'Pattern scale',type:'range',min:.2,max:3,step:.05,value:1},{prop:'mouseInteractive',label:'Pointer interaction',type:'check',value:true}],
    silk: [{prop:'color',label:'Silk color',type:'color',value:'#8b5cf6'},{prop:'speed',label:'Flow speed',type:'range',min:.1,max:10,step:.1,value:5},{prop:'noiseIntensity',label:'Texture',type:'range',min:0,max:4,step:.1,value:1.5},{prop:'rotation',label:'Rotation',type:'range',min:0,max:360,step:1,value:0}],
    beams: [{prop:'lightColor',label:'Beam color',type:'color',value:'#c4b5fd'},{prop:'speed',label:'Beam speed',type:'range',min:.1,max:5,step:.1,value:2},{prop:'beamNumber',label:'Beam count',type:'range',min:2,max:24,step:1,value:12},{prop:'noiseIntensity',label:'Noise',type:'range',min:0,max:4,step:.1,value:1.75}]
  };
  function particleControlMarkup(control) {
    if (control.type === 'check') return `<label class="check-control"><input data-particle-option="${control.prop}" type="checkbox" ${control.value ? 'checked' : ''}>${control.label}</label>`;
    if (control.type === 'colors') return `<div class="particle-colors"><span>${control.label}</span>${control.value.map((color,index) => `<input aria-label="${control.label} ${index + 1}" data-particle-option="${control.prop}-${index}" type="color" value="${color}">`).join('')}</div>`;
    if (control.type === 'color') return `<label class="color-control">${control.label}<input data-particle-option="${control.prop}" type="color" value="${control.value}"></label>`;
    if (control.type === 'text') return `<label class="text-slot-control"><span>${control.label}</span><input data-particle-option="${control.prop}" type="text" value="${escAttr(control.value)}"></label>`;
    return `<label class="range-control">${control.label}<output>${control.value}</output><input data-particle-option="${control.prop}" type="range" min="${control.min}" max="${control.max}" step="${control.step}" value="${control.value}"></label>`;
  }
  function getParticleControls(slug) {
    if (particleControls[slug]) return particleControls[slug];
    // Never invent controls: undocumented effects remain usable as-is until
    // their public API is explicitly mapped here.
    return [];
  }
  function previewControls(item) {
    const kind = item.category;
    const particle = particleEffect(item.name);
    if (particle) return getParticleControls(particle.slug).map(particleControlMarkup).join('') || `<p class="preview-control-note">This effect has no public runtime props.</p>`;
    if (item.name === 'Kbd') {
      const keys = ['',...'ABCDEFGHIJKLMNOPQRSTUVWXYZ','Enter','Esc','Space','Tab','↑','↓','←','→'];
      const options = selected => keys.map(key => `<option value="${key}" ${key === selected ? 'selected' : ''}>${key || '—'}</option>`).join('');
      return `<label>Modifier<select data-option="modifier"><option value="">None</option><option value="⌘" selected>⌘ Command</option><option value="Ctrl">⌃ Control</option><option value="⌥">⌥ Option</option><option value="⇧">⇧ Shift</option><option value="Alt">Alt</option></select></label><label>Key 1<select data-option="key1">${options('K')}</select></label><label>Key 2<select data-option="key2">${options('')}</select></label><label>Key 3<select data-option="key3">${options('')}</select></label>`;
    }
    let contextual = `<label>${t('variant')}<select data-option="variant"><option>primary</option><option>outline</option><option>subtle</option></select></label><label>${t('size')}<select data-option="size"><option>sm</option><option selected>md</option><option>lg</option></select></label>`;
    if (kind === 'Layout') contextual = `<label>${t('density')}<select data-option="density"><option value="comfortable">Comfortable</option><option value="compact">Compact</option><option value="airy">Airy</option></select></label><label>Align<select data-option="align"><option>center</option><option>start</option><option>end</option></select></label>`;
    if (kind === 'Typography') contextual = `<label>${t('size')}<select data-option="size"><option>sm</option><option selected>md</option><option>lg</option></select></label><label>Weight<select data-option="weight"><option>regular</option><option selected>medium</option><option>bold</option></select></label>`;
    if (kind === 'Forms' || kind === 'Selection') contextual = `<label>${t('state')}<select data-option="status"><option>default</option><option>success</option><option>error</option></select></label><label>${t('size')}<select data-option="size"><option>sm</option><option selected>md</option><option>lg</option></select></label>`;
    if (item.name === 'SegmentedControl') contextual = `<label>Value<select data-option="value"><option value="day">Day</option><option value="week">Week</option><option value="month">Month</option></select></label><label>${t('size')}<select data-option="size"><option>sm</option><option selected>md</option><option>lg</option></select></label>`;
    if (kind === 'Overlay') contextual = `<label>${t('placement')}<select data-option="placement"><option>center</option><option>top</option><option>bottom</option></select></label><button class="control-action" data-action="dialog">${t('open')} ${title(item.name)}</button>`;
    if (kind === 'Feedback') contextual = `<label>Tone<select data-option="tone"><option>neutral</option><option>success</option><option>danger</option></select></label><label class="check-control"><input data-option="animated" type="checkbox" checked>Animated</label>`;
    if (kind === 'Effects') contextual = `<label>Intensity<input data-option="intensity" type="range" min="20" max="100" value="70"></label><label class="check-control"><input data-option="animated" type="checkbox" checked>Motion</label>`;
    const colorless = new Set(['VisuallyHidden','Kbd']);
    const borderless = new Set(['Text','Heading','Link','Kbd','List','Flex','Stack','Grid','Center','AspectRatio','Checkbox','Radio','RadioGroup','Switch','Slider','RangeSlider','Rating','Progress','Spinner','Skeleton','LoadingOverlay','EmptyState','Avatar','AvatarGroup','Badge','Chip','Tag','Timeline','Icon','Image','GradientSurface','Glow','Shine','Spotlight','Mask','Overlay','VisuallyHidden']);
    const staticComponents = new Set(['Text','Heading','Link','Kbd','List','Box','Flex','Stack','Grid','Center','Container','Divider','AspectRatio','Icon','Image','VisuallyHidden']);
    const colorControl = colorless.has(item.name) ? '' : `<label class="color-control">Color<input data-option="color" type="color" value="#5b55e7"></label>`;
    const borderControls = borderless.has(item.name) ? '' : `<label class="color-control">Border color<input data-option="borderColor" type="color" value="#8f96a8"></label><label>Border width<select data-option="borderWidth"><option value="0px">None</option><option value="1px" selected>Thin</option><option value="2px">Medium</option><option value="3px">Bold</option></select></label>`;
    const disabledControl = staticComponents.has(item.name) ? '' : `<label class="check-control"><input data-option="disabled" type="checkbox">${t('disabled')}</label>`;
    return `${contextual}${colorControl}${borderControls}${disabledControl}`;
  }
  const contractProps = {
    Table:[['columns','Column[]','required','Header, key, and optional cell renderer definitions.'],['rows','Row[]','required','Data records rendered in the table body.'],['rowActions','(row) => ReactNode','—','Optional per-row action menu or buttons.'],['onRowClick','(row) => void','—','Called when a user activates a row.'],['emptyState','ReactNode','—','Content shown when rows is empty.']],
    Card:[['title','ReactNode','—','Heading content rendered in the card header.'],['actions','ReactNode','—','Header actions such as CardMenu or IconButton.'],['disabled','boolean','false','Applies a non-interactive visual state.'],['children','ReactNode','—','Card body content.']],
    Button:[['children','ReactNode','required','Label and optional icons or loading indicator.'],['onClick','() => void','—','Action callback.'],['loading','boolean','false','Replaces the label with progress feedback.'],['disabled','boolean','false','Prevents activation.']],
    Input:[['label','ReactNode','—','Visible field label.'],['hint','ReactNode','—','Supporting text displayed below the field.'],['value','string','—','Controlled value.'],['onChange','ChangeEventHandler','—','Native controlled-value callback.'],['error','ReactNode','—','Validation message and invalid state.'],['placeholder','string','—','Short input hint.'],['status','default | success | error','default','Validation state and semantic border colour.'],['size','sm | md | lg','md','Field density.'],['disabled','boolean','false','Prevents interaction.']],
    Switch:[['checked','boolean','false','Controlled on/off value.'],['onChange','(checked: boolean) => void','—','Called when the checked value changes.'],['label','string','required','Visible and accessible switch label.'],['disabled','boolean','false','Prevents interaction.']],
    ToggleGroup:[['value','string','first option','Controlled value of the selected option.'],['onValueChange','(value: string) => void','—','Called when a user selects an option.'],['options','ToggleGroupOption[]','required','Value and accessible label for each exclusive option.'],['disabled','boolean','false','Prevents interaction.'],['aria-label','string','required when no visible label','Accessible name for the group.']],
    Select:[['options','Option[]','required','Value/label pairs rendered in the list.'],['value','string','—','Selected value.'],['onChange','(value) => void','—','Selection callback.'],['label','ReactNode','—','Visible field label.']],
    Dialog:[['open','boolean','false','Controls visibility.'],['onClose','() => void','required','Escape, close button, and backdrop callback.'],['title','ReactNode','required','Dialog heading announced to assistive technology.'],['children','ReactNode','required','Dialog body and footer content.']],
    Tabs:[['items','Tab[]','required','Tab labels, keys, disabled state, and optional icons.'],['activeKey','string','first item','Controlled active tab.'],['onChange','(key) => void','required','Called after keyboard or pointer selection.']],
    Alert:[['title','ReactNode','—','Short status heading.'],['description','ReactNode','—','Supporting explanation.'],['action','ReactNode','—','Optional action button.'],['onDismiss','() => void','—','Dismiss callback.']],
    Avatar:[['src','string','—','Image source.'],['fallback','string','—','Initials or icon when image is unavailable.'],['alt','string','required','Accessible identity description.'],['size','Size','md','Visual size token.']]
  };
  function apiTable(name) {
    const particle = particleEffect(name);
    const typeFor = control => control.type === 'check' ? 'boolean' : control.type === 'color' ? 'string (hex color)' : control.type === 'colors' ? 'number[]' : control.type === 'text' ? 'string' : 'number';
    const particleRows = particle ? getParticleControls(particle.slug).map(control => [control.prop === 'ballColors' ? 'colors' : control.prop,typeFor(control),Array.isArray(control.value) ? `[${control.value.join(', ')}]` : String(control.value),control.label]) : null;
    const rows = particleRows || contractProps[name] || [['children','ReactNode','—','Composed content or slot content.'],['variant','string','default','Semantic visual intent.'],['size','Size','md','Density token where supported.'],['disabled','boolean','false','Non-interactive visual and semantic state.']];
    return `<table class="props-table" data-api-table><thead><tr><th>Prop / slot</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody>${rows.map(([prop,type,defaultValue,desc]) => `<tr><td><code>${prop}</code></td><td>${type}</td><td>${defaultValue}</td><td>${desc}</td></tr>`).join('')}</tbody></table>`;
  }
  const escAttr = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const textPropNames = {
    Heading:['title','subtitle'], Input:['label','hint'], Textarea:['label','hint'], FormControl:['label','feedback'],
    Alert:['title','description','actionLabel'], Sheet:['triggerLabel','title','primaryActionLabel','secondaryActionLabel'],
    Drawer:['triggerLabel','title','description'], Dialog:['triggerLabel','title','description','cancelLabel','confirmLabel'],
    AlertDialog:['triggerLabel','title','description','cancelLabel','confirmLabel'], Modal:['triggerLabel','title','description'],
    EmptyState:['title','description','actionLabel'], Toast:['title','description'], Status:['title','description']
  };
  function textSlotLabel(node, index, used) {
    const element = node.parentElement;
    const tag = element.tagName.toLowerCase();
    let label = /^h[1-6]$/.test(tag) ? 'Heading' : tag === 'p' || tag === 'small' ? 'Supporting text' : tag === 'button' ? 'Button label' : tag === 'a' ? 'Link label' : tag === 'b' || tag === 'strong' ? 'Title' : tag === 'label' || tag === 'span' ? 'Label' : `Text ${index + 1}`;
    const count = (used.get(label) || 0) + 1; used.set(label, count);
    return count === 1 ? label : `${label} ${count}`;
  }
  function hydrateTextControls(item) {
    if (particleEffect(item.name) || item.name === 'Box') return;
    const stage = $('#component-preview'), controls = $('.preview-controls');
    const walker = document.createTreeWalker(stage, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const value = node.nodeValue.trim(), parent = node.parentElement;
        if (!value || !parent || parent.closest('script,style,svg,code,kbd,option')) return NodeFilter.FILTER_REJECT;
        if (/^[×+−•⌄→‹›…✓?*]+$/.test(value)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const slots = []; let node;
    while ((node = walker.nextNode())) {
      const textNode = node;
      slots.push({ node: textNode, get: () => textNode.nodeValue.trim(), set: value => { textNode.nodeValue = value; } });
    }
    $$('input[placeholder],textarea[placeholder]', stage).forEach(element => slots.push({ node: element, attribute:'placeholder', get: () => element.placeholder, set: value => { element.placeholder = value; } }));
    $$('input[value]:not([type="range"]):not([type="color"]):not([type="checkbox"]):not([type="radio"]),textarea', stage).forEach(element => {
      if (!element.value) return;
      slots.push({ node: element, attribute:'value', get: () => element.value, set: value => { element.value = value; element.setAttribute('value', value); } });
    });
    if (item.category === 'Media') $$('img[alt]', stage).forEach(element => slots.push({ node: element, attribute:'alt', get: () => element.alt, set: value => { element.alt = value; } }));
    if (!slots.length) return;
    const used = new Map();
    const propCounts = new Map();
    const definitions = slots.map((slot, index) => {
      const label = slot.attribute === 'placeholder' ? 'Placeholder' : slot.attribute === 'value' ? 'Value' : slot.attribute === 'alt' ? 'Alternative text' : textSlotLabel(slot.node, index, used);
      const baseProp = slot.attribute || textPropNames[item.name]?.[index] || (index === 0 ? 'children' : `text${index + 1}`);
      const propCount = (propCounts.get(baseProp) || 0) + 1; propCounts.set(baseProp, propCount);
      const prop = propCount === 1 ? baseProp : `${baseProp}${propCount}`;
      return { ...slot, label, prop, value: slot.get() };
    });
    stage._textSlots = definitions;
    controls.insertAdjacentHTML('afterbegin', definitions.map((slot, index) => `<label class="text-slot-control"><span>${slot.label}</span><input data-text-slot="${index}" type="text" value="${escAttr(slot.value)}" aria-label="${escAttr(slot.label)}"></label>`).join(''));
    const api = $('[data-api-table] tbody');
    if (api) {
      const existing = new Set($$('td:first-child code', api).map(code => code.textContent));
      api.insertAdjacentHTML('beforeend', definitions.filter(slot => !existing.has(slot.prop)).map(slot => `<tr><td><code>${slot.prop}</code></td><td>string</td><td>${esc(slot.value)}</td><td>${esc(slot.label)} editable text slot shown in the preview.</td></tr>`).join(''));
    }
    $$('[data-text-slot]', controls).forEach(input => input.addEventListener('input', event => {
      const slot = stage._textSlots[Number(event.currentTarget.dataset.textSlot)];
      if (slot) slot.set(event.currentTarget.value);
      syncFrameworkCode(item);
    }));
  }
  function hydrateControlApi() {
    const body = $('[data-api-table] tbody'), controls = $('.preview-controls');
    if (!body || !controls) return;
    const existing = new Set($$('td:first-child code', body).map(code => code.textContent));
    const rows = $$('[data-option]', controls).filter(control => !existing.has(control.dataset.option)).map(control => {
      const prop = control.dataset.option, label = control.closest('label')?.textContent.trim() || prop;
      const type = control.type === 'checkbox' ? 'boolean' : control.type === 'range' ? 'number' : 'string';
      const value = control.type === 'checkbox' ? String(control.checked) : control.value;
      existing.add(prop);
      return `<tr><td><code>${prop}</code></td><td>${type}</td><td>${esc(value)}</td><td>${esc(label)} preview property.</td></tr>`;
    });
    body.insertAdjacentHTML('beforeend', rows.join(''));
  }
  function renderSidebar() {
    const tree = (label, links) => `<section class="side-tree"><h2>${label}</h2><div class="side-tree-links">${links}</div></section>`;
    const componentGroups = Object.entries(groups).filter(([group]) => group !== 'Particles').map(([group,names]) => tree(categoryLabel(group), names.map(name => `<a class="side-link" href="#/components/${slug(name)}">${title(name)}</a>`).join(''))).join('');
    const particleLinks = (groups.Particles || []).map(name => `<a class="side-link" href="#/particles/${slug(name)}">${title(name)}</a>`).join('');
    sidebar.innerHTML = `${tree(t('start'), `<a class="side-link" href="#/getting-started">${t('intro')}</a><a class="side-link" href="#/installation">${t('install')}</a><a class="side-link" href="#/playground">${t('studio')}</a>`)}${tree(t('catalogue'), `<a class="side-link" href="#/particles">${t('particles')}</a><a class="side-link" href="#/components">${t('all')}</a>`)}<section class="side-collection side-collection-primary"><h2>${t('particles')}</h2>${tree(state.locale === 'it' ? 'Effetti e backgrounds' : 'Effects & backgrounds', particleLinks)}</section><section class="side-collection side-collection-secondary"><h2>${t('components')}</h2>${componentGroups}</section>`;
  }
  function componentCard(item) {
    const route = item.category === 'Particles' ? `particles/${slug(item.name)}` : `components/${slug(item.name)}`;
    return `<article class="component-card" role="link" tabindex="0" data-component-link="${route}"><div class="card-preview">${componentPreview(item.name,true)}</div><h3>${title(item.name)}</h3><p>${description(item)}</p><footer><span>${categoryLabel(item.category)}</span><span class="status ${item.status}">${t(item.status)}</span></footer></article>`;
  }
  function initParticleLogos(scope = document) {
    $$('.pv-particle-logo', scope).forEach(canvas => {
      if (canvas.dataset.ready) return;
      canvas.dataset.ready = 'true';
      const ctx = canvas.getContext('2d'); if (!ctx) return;
      const image = new Image(); image.src = './src/assets/gozion-mark.png';
      image.onload = () => {
        const points = [], sample = document.createElement('canvas'), sampleCtx = sample.getContext('2d', {willReadFrequently:true});
        sample.width = 180; sample.height = 180;
        const scale = Math.min(sample.width / image.width, sample.height / image.height), w = image.width * scale, h = image.height * scale;
        sampleCtx.clearRect(0, 0, sample.width, sample.height); sampleCtx.drawImage(image, (sample.width-w)/2, (sample.height-h)/2, w, h);
        const pixels = sampleCtx.getImageData(0, 0, sample.width, sample.height).data;
        for (let y=0; y<sample.height; y+=2) for (let x=0; x<sample.width; x+=2) {
          const i=(y*sample.width+x)*4, r=pixels[i], g=pixels[i+1], b=pixels[i+2], a=pixels[i+3], brightness=(r+g+b)/3;
          if (a>40 && (brightness>42 || Math.max(r,g,b)-Math.min(r,g,b)>28)) points.push({x:x/sample.width,y:y/sample.height,r,g,b,size:0.7+Math.random()*1.15,phase:Math.random()*Math.PI*2,alpha:1});
        }
        const resize = () => { const rect=canvas.getBoundingClientRect(), dpr=Math.min(devicePixelRatio||1,2); canvas.width=Math.max(1,rect.width*dpr); canvas.height=Math.max(1,rect.height*dpr); ctx.setTransform(dpr,0,0,dpr,0,0); canvas._size={w:rect.width,h:rect.height}; };
        resize(); new ResizeObserver(resize).observe(canvas);
        let pointer=null;
        canvas.addEventListener('pointermove', e => { const rect=canvas.getBoundingClientRect(); pointer={x:e.clientX-rect.left,y:e.clientY-rect.top}; });
        canvas.addEventListener('pointerleave', () => { pointer=null; });
        const draw = time => { const {w,h}=canvas._size||{w:canvas.clientWidth,h:canvas.clientHeight}; ctx.clearRect(0,0,w,h); const logoSize=Math.min(w*.5,h*.64), offsetX=(w-logoSize)/2, offsetY=(h-logoSize)/2, radius=Math.max(28,logoSize*.19);
          points.forEach(p => { const x=offsetX+p.x*logoSize+Math.sin(time/900+p.phase)*.45, y=offsetY+p.y*logoSize+Math.cos(time/1000+p.phase)*.45; const distance=pointer?Math.hypot(x-pointer.x,y-pointer.y):Infinity; const target=distance<radius?Math.max(0,distance/radius):1; p.alpha+=(target-p.alpha)*.16; if(p.alpha<.02)return; ctx.fillStyle=`rgba(${p.r},${p.g},${p.b},${p.alpha})`; ctx.beginPath(); ctx.arc(x,y,p.size,0,Math.PI*2); ctx.fill(); }); requestAnimationFrame(draw); };
        requestAnimationFrame(draw);
      };
    });
  }
  function initBackgroundPreviews(scope = document) {
    const hosts = $$('[data-background-effect]', scope);
    const deferredHosts = [];
    const mountHost = host => {
      if (host.dataset.ready) { host._mountParticle?.(); return; }
      host.dataset.ready = 'true';
      let unmount = () => {};
      const mount = (props = {}) => {
        if (globalThis.GozionParticleRuntime) {
          unmount();
          unmount = globalThis.GozionParticleRuntime.mount(host, host.dataset.backgroundEffect, props);
        }
      };
      host._mountParticle = mount;
      host._unmountParticle = () => { unmount(); };
      if (globalThis.GozionParticleRuntime) mount(); else window.addEventListener('gozion-particle-runtime-ready', mount, {once:true});
      backgroundPreviewCleanups.add(() => { window.removeEventListener('gozion-particle-runtime-ready', mount); unmount(); });
    };
    hosts.forEach(host => host.dataset.particlePreview === 'card' ? deferredHosts.push(host) : mountHost(host));
    if (!deferredHosts.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const host = entry.target;
        if (entry.isIntersecting) mountHost(host);
        else host._unmountParticle?.();
      });
    }, { rootMargin: '220px 0px' });
    deferredHosts.forEach(host => observer.observe(host));
    backgroundPreviewCleanups.add(() => observer.disconnect());
  }
  function clearBackgroundPreviews() { backgroundPreviewCleanups.forEach(cleanup => cleanup()); backgroundPreviewCleanups.clear(); }
  function renderCatalogue() {
    const orderedGroups = Object.entries(groups).sort(([a], [b]) => (a === 'Particles' ? -1 : b === 'Particles' ? 1 : 0));
    main.innerHTML = `<div class="crumbs"><a href="#/getting-started">${t('docs')}</a><span>/</span><span>${t('catalogue')}</span></div><p class="eyebrow">${t('catalogue')}</p><h1 class="page-title">${t('catalogueTitle')}</h1><p class="page-intro">${items.length} ${t('catalogueIntro')}</p>${orderedGroups.map(([group,names]) => `<section class="${group === 'Particles' ? 'catalogue-particles' : ''}"><h2 class="section-title">${categoryLabel(group)}</h2><div class="component-grid ${group === 'Particles' ? 'particle-grid' : ''}">${names.map(name => componentCard(findComponent(slug(name)))).join('')}</div></section>`).join('')}`;
    initParticleLogos(main);
    initBackgroundPreviews(main);
  }
  function renderParticleGallery() {
    const particleItems = items.filter(item => item.category === 'Particles');
    main.innerHTML = `<div class="crumbs"><a href="#/getting-started">${t('docs')}</a><span>/</span><span>${t('particles')}</span></div><p class="eyebrow">React Bits × Gozion</p><h1 class="page-title">${t('particles')}</h1><p class="page-intro">${state.locale === 'it' ? '53 background derivati dalle implementazioni ufficiali React Bits. Le card caricano l’effetto soltanto quando entrano nel viewport.' : '53 backgrounds derived from the official React Bits implementations. Cards load their effect only as they enter the viewport.'}</p><div class="component-grid particle-grid">${particleItems.map(componentCard).join('')}</div>`;
    initBackgroundPreviews(main);
  }
  function renderComponent(item) {
    const index = items.indexOf(item), previous = items[index - 1], next = items[index + 1];
    main.innerHTML = `<div class="crumbs"><a href="#/getting-started">${t('docs')}</a><span>/</span><a href="#/components">${t('components')}</a><span>/</span><span>${title(item.name)}</span></div><p class="eyebrow">${item.category} · ${t(item.status)}</p><h1 class="page-title">${title(item.name)}</h1><p class="page-intro">${description(item)}</p><h2 class="section-title">${t('live')}</h2><div class="preview-panel"><div class="preview-stage" id="component-preview">${componentPreview(item.name)}</div><div class="preview-controls">${previewControls(item)}</div></div><div class="framework-tabs">${['Preview','React','Vue','Angular'].map(tab => `<button class="${state.framework === tab ? 'active' : ''}" data-framework="${tab}">${tab === 'Preview' ? t('preview') : tab}</button>`).join('')}</div><div id="framework-content">${state.framework === 'Preview' ? `<div class="preview-note">${state.locale === 'it' ? 'Interagisci direttamente con il componente qui sopra.' : 'Interact directly with the component above.'}</div>` : codeBlock(codeExample(item.name,{variant:'primary',size:'md'}))}</div><h2 class="section-title">${t('install')}</h2>${codeBlock(`npx gozion-ui@latest add ${slug(item.name)}`)}<h2 class="section-title">${t('usage')}</h2>${codeBlock(`import { ${item.name} } from '@gozion-ui/${state.framework === 'Angular' ? 'angular' : state.framework === 'Vue' ? 'vue' : 'react'}';\n\n${codeExample(item.name)}`)}<h2 class="section-title">${t('custom')}</h2><p class="section-intro">${state.locale === 'it' ? 'Varianti semantiche per il flusso normale, token locali per il controllo preciso.' : 'Semantic variants for the common path, local tokens for precise control.'}</p>${codeBlock(`.my-${slug(item.name)} {\n  --ui-primary: #5b55e7;\n  --ui-radius: .625rem;\n}`)}<h2 class="section-title">${t('a11y')}</h2><div class="a11y-note"><strong>${state.locale === 'it' ? 'Tastiera e screen reader.' : 'Keyboard and screen reader.'}</strong> ${state.locale === 'it' ? 'Focus visibile, semantica nativa, contrasto verificabile e movimento ridotto sono parte del contratto del componente.' : 'Visible focus, native semantics, verifiable contrast, and reduced motion are part of the component contract.'}</div><h2 class="section-title">${t('api')}</h2><table class="props-table"><thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td><code>variant</code></td><td>string</td><td>primary</td><td>${t('variant')}</td></tr><tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>${t('size')}</td></tr><tr><td><code>disabled</code></td><td>boolean</td><td>false</td><td>${t('disabled')}</td></tr></tbody></table><nav class="page-nav">${previous ? `<a href="#/components/${slug(previous.name)}">← ${title(previous.name)}</a>` : '<span></span>'}${next ? `<a href="#/components/${slug(next.name)}">${title(next.name)} →</a>` : '<span></span>'}</nav>`;
    const genericApi = $('.props-table'); if (genericApi) genericApi.outerHTML = apiTable(item.name);
    hydrateTextControls(item);
    hydrateControlApi();
    bindPreviewOptions(item);
    syncFrameworkCode(item);
    initParticleLogos(main);
    initBackgroundPreviews(main);
  }
  function bindPreviewOptions(item) {
    const updatePreview = () => {
      const stage = $('#component-preview');
      const options = Object.fromEntries($$('[data-option]').map(input => [input.dataset.option, input.type === 'checkbox' ? input.checked : input.value]));
      if (item.name === 'Kbd') {
        const shortcut = [options.modifier,options.key1,options.key2,options.key3].filter(Boolean);
        $('[data-kbd-output]',stage).innerHTML = shortcut.map(key => `<kbd>${key}</kbd>`).join('<i>+</i>');
        if (state.framework !== 'Preview') $('#framework-content').innerHTML = codeBlock(kbdCode(shortcut));
        return;
      }
      const particle = particleEffect(item.name);
      if (particle) {
        const particleOptions = Object.fromEntries($$('[data-particle-option]').map(input => [input.dataset.particleOption, input.type === 'checkbox' ? input.checked : input.value]));
        const props = {};
        Object.entries(particleOptions).forEach(([key, value]) => {
          if (key.includes('-') || key === 'canvasBackground') return;
          const input = $(`[data-particle-option="${key}"]`);
          props[key] = typeof value === 'string' && input?.type === 'range' ? Number(value) : value;
        });
        getParticleControls(particle.slug).filter(control => control.type === 'colors').forEach(control => {
          const colors = control.value.map((_, index) => particleOptions[`${control.prop}-${index}`]);
          props[control.prop] = particle.slug === 'ballpit' ? colors.map(color => Number.parseInt(color.slice(1), 16)) : colors;
        });
        if (particle.slug === 'ballpit') { props.colors = props.ballColors; delete props.ballColors; }
        const host = $('[data-background-effect]', stage);
        if (particle.slug === 'ballpit') {
          props.ambientColor = Number.parseInt(particleOptions.ambientColor.slice(1), 16);
          host.style.background = particleOptions.canvasBackground;
        }
        host?._mountParticle?.(props);
        if (state.framework !== 'Preview') $('#framework-content').innerHTML = codeBlock(codeExample(item.name, props));
        $$('output', document.querySelector('.preview-controls')).forEach(output => { const input = output.parentElement.querySelector('input[type=range]'); if (input) output.textContent = input.value; });
        return;
      }
      stage.dataset.size = options.size || 'md'; stage.dataset.status = options.status || options.tone || 'default'; stage.dataset.density = options.density || 'comfortable'; stage.dataset.align = options.align || 'center'; stage.dataset.placement = options.placement || 'center'; stage.dataset.animated = options.animated === false ? 'false' : 'true'; stage.dataset.disabled = String(Boolean(options.disabled)); stage.style.setProperty('--preview-intensity', `${options.intensity || 70}%`); stage.style.setProperty('--ui-primary', options.color || '#5b55e7'); stage.style.setProperty('--ui-focus-ring', options.color || '#5b55e7'); stage.style.setProperty('--ui-border-color', options.borderColor || '#8f96a8'); stage.style.setProperty('--preview-border-width', options.borderWidth || '1px'); stage.setAttribute('aria-disabled', String(Boolean(options.disabled)));
      const statusColor = options.status === 'success' || options.tone === 'success' ? '#1c9b6c' : options.status === 'error' || options.tone === 'danger' ? '#dc3545' : options.color || '#5b55e7';
      stage.style.setProperty('--ui-primary', statusColor); stage.style.setProperty('--ui-focus-ring', statusColor); stage.style.setProperty('--ui-border-color', options.status && options.status !== 'default' ? statusColor : options.borderColor || '#8f96a8');
      $$('button,input,select,textarea', stage).forEach(element => { element.disabled = Boolean(options.disabled); });
      const primary = $('.pv-button', stage); if (primary && options.variant) primary.dataset.variant = options.variant;
      if (item.name === 'SegmentedControl' && options.value) { $$('[data-segment-value]', stage).forEach(button => { const selected = button.dataset.segmentValue === options.value; button.classList.toggle('active', selected); button.setAttribute('aria-checked', String(selected)); }); }
      syncFrameworkCode(item);
    };
    $$('[data-option],[data-particle-option]').forEach(control => { control.addEventListener('input', updatePreview); control.addEventListener('change', updatePreview); });
  }
  function renderHome() {
    const particleItems = items.filter(item => item.category === 'Particles');
    const featuredParticles = ['Aurora','Orb','DotField','Waves','GridDistortion','Ballpit','GridMotion','LiquidChrome'];
    main.innerHTML = `<section class="hero hero-immersive"><div class="hero-particle" data-background-effect="aurora" aria-hidden="true"></div><div class="hero-particle hero-particle-orb" data-background-effect="orb" aria-hidden="true"></div><div class="hero-content"><p class="eyebrow">Gozion UI / v0.2 · Particle-first</p><h1 class="page-title">${state.locale === 'it' ? 'Particellari che danno identità al tuo prodotto.' : 'Particles that give your product an identity.'}</h1><p class="page-intro">${state.locale === 'it' ? 'Effetti interattivi, configurabili e pronti per React, Vue e Angular. I componenti accessibili restano la base per comporre tutto il resto.' : 'Interactive, configurable effects for React, Vue, and Angular. Accessible components remain the foundation for everything around them.'}</p><div class="hero-actions"><a class="docs-button primary" href="#/particles">${t('particles')} →</a><a class="docs-button" href="#/components">${t('components')} →</a></div><div class="stat-row"><div class="stat"><strong>${particleItems.length}</strong><span>${t('particles').toLowerCase()}</span></div><div class="stat"><strong>3</strong><span>framework</span></div><div class="stat"><strong>${items.length - particleItems.length}</strong><span>${t('components').toLowerCase()}</span></div></div></div></section><section class="home-particles"><p class="eyebrow">${t('particles')}</p><h2 class="section-title">${state.locale === 'it' ? 'Esplora i particellari' : 'Explore particles'}</h2><p class="section-intro">${state.locale === 'it' ? 'Il cuore di Gozion: visual interattivi che puoi usare, modificare e copiare.' : 'The heart of Gozion: interactive visuals you can use, tune, and copy.'}</p><div class="component-grid particle-grid particle-grid-featured">${featuredParticles.map(name => componentCard(findComponent(slug(name)))).join('')}</div><a class="docs-button particle-all-link" href="#/particles">${state.locale === 'it' ? 'Vedi tutti i particellari' : 'Browse all particles'} →</a></section><section class="home-components"><p class="eyebrow">${t('components')}</p><h2 class="section-title">${state.locale === 'it' ? 'Componenti di supporto' : 'Supporting components'}</h2><p class="section-intro">${state.locale === 'it' ? 'Primitive accessibili per integrare i particellari in interfacce complete.' : 'Accessible primitives to integrate particles into complete interfaces.'}</p><div class="component-grid">${['Button','Input','Card','Dialog','Switch','Table'].map(name => componentCard(findComponent(slug(name)))).join('')}</div></section>`;
    initBackgroundPreviews(main);
  }
  function renderInstallation() {
    const isIt = state.locale === 'it';
    const install = (title, command) => '<h3 class="install-subtitle">' + title + '</h3>' + codeBlock(command);
    const reactExample = 'import "@gozion-ui/styles";\nimport { Button, Card, FormControl, Input, ThemeProvider } from "@gozion-ui/react";\n\nexport function App() {\n  return (\n    <ThemeProvider theme="light">\n      <Card title="Project settings" variant="default">\n        <FormControl label="Workspace name" hint="Visible to your team">\n          <Input placeholder="Gozion" status="success" size="md" />\n        </FormControl>\n        <Button variant="primary" size="md">Save changes</Button>\n      </Card>\n    </ThemeProvider>\n  );\n}';
    const vueExample = '<script setup>\nimport "@gozion-ui/styles";\nimport { ref } from "vue";\nimport { Button, Card, FormControl, Input } from "@gozion-ui/vue";\nconst workspace = ref("Gozion");\n</script>\n\n<template>\n  <section data-ui-theme="light">\n    <Card>\n      <FormControl label="Workspace name" hint="Visible to your team">\n        <Input v-model="workspace" status="success" placeholder="Gozion" />\n      </FormControl>\n      <Button variant="primary">Save changes</Button>\n    </Card>\n  </section>\n</template>';
    const angularExample = 'import "@gozion-ui/styles";\nimport { Component } from "@angular/core";\nimport { ButtonComponent, CardComponent, FormControlComponent, InputComponent } from "@gozion-ui/angular";\n\n@Component({\n  standalone: true,\n  imports: [ButtonComponent, CardComponent, FormControlComponent, InputComponent],\n  template: `<main data-ui-theme="light">\n    <ui-card>\n      <ui-form-control label="Workspace name" hint="Visible to your team">\n        <ui-input value="Gozion" status="success" placeholder="Gozion"></ui-input>\n      </ui-form-control>\n      <ui-button variant="primary">Save changes</ui-button>\n    </ui-card>\n  </main>`\n})\nexport class AppComponent {}';
    const apiExample = isIt
      ? '<Button variant="primary" size="lg" disabled={false}>\n  Salva progetto\n</Button>\n\n<Input\n  placeholder="nome@azienda.com"\n  status="error"\n  color="#171044"\n  borderColor="#dc3545"\n  borderWidth="2px"\n/>'
      : '<Button variant="primary" size="lg" disabled={false}>\n  Save project\n</Button>\n\n<Input\n  placeholder="name@company.com"\n  status="error"\n  color="#171044"\n  borderColor="#dc3545"\n  borderWidth="2px"\n/>';
    const particleExample = 'import { GridMotion, GridDistortion } from "@gozion-ui/react/particles";\n\n<GridMotion\n  items={["Gozion", "React", "Vue", "Angular"]}\n  rows={4}\n  columns={7}\n  gap={12}\n  gradientColor="#5b55e7"\n  itemBackground="#11131b"\n/>\n\n<GridDistortion grid={18} strength={0.22} mouse={0.16} relaxation={0.9} />';
    main.innerHTML = [
      '<p class="eyebrow">' + t('start') + '</p><h1 class="page-title">' + t('install') + ' Gozion UI</h1>',
      '<p class="page-intro">' + (isIt ? 'Guida pratica: installa il pacchetto, importa gli stili, componi la UI con props esplicite e usa le API delle singole pagine per ogni opzione disponibile.' : 'A practical guide: install the package, import styles, compose UI with explicit props, and use every component page API for all available options.') + '</p>',
      '<h2 class="section-title">1. ' + (isIt ? 'Scegli il tuo framework' : 'Choose your framework') + '</h2>',
      '<p class="section-intro">' + (isIt ? 'Gli esempi usano pnpm; npm e yarn funzionano allo stesso modo.' : 'Examples use pnpm; npm and yarn work the same way.') + '</p>',
      install('React', 'pnpm add @gozion-ui/react @gozion-ui/styles'),
      install('Vue 3', 'pnpm add @gozion-ui/vue @gozion-ui/styles'),
      install('Angular 17+', 'pnpm add @gozion-ui/angular @gozion-ui/styles'),
      '<h2 class="section-title">2. ' + (isIt ? 'Importa gli stili una sola volta' : 'Import styles once') + '</h2>',
      '<p class="section-intro">' + (isIt ? 'Aggiungi questo import nel punto di ingresso dell’app, ad esempio main.tsx o main.ts.' : 'Add this import to your application entry point, for example main.tsx or main.ts.') + '</p>',
      codeBlock('import "@gozion-ui/styles";'),
      '<h2 class="section-title">3. ' + (isIt ? 'Crea il primo componente' : 'Build your first component') + '</h2>',
      '<div class="install-examples"><article><h3>React</h3>' + codeBlock(reactExample) + '</article><article><h3>Vue</h3>' + codeBlock(vueExample) + '</article><article><h3>Angular</h3>' + codeBlock(angularExample) + '</article></div>',
      '<h2 class="section-title">4. ' + (isIt ? 'Leggi e usa le props' : 'Read and use props') + '</h2>',
      '<p class="section-intro">' + (isIt ? 'Ogni controllo nell’anteprima aggiorna il codice copiabile. I nomi sono prop pubbliche: variant e size definiscono l’aspetto; status usa colori semantici; color, borderColor e borderWidth sono override locali; disabled mantiene semantica e blocca l’interazione.' : 'Every preview control updates the copyable code. Names are public props: variant and size define appearance; status uses semantic colors; color, borderColor and borderWidth are local overrides; disabled preserves semantics and blocks interaction.') + '</p>',
      codeBlock(apiExample),
      '<h2 class="section-title">5. ' + (isIt ? 'Compone layout e particellari' : 'Compose layout and particles') + '</h2>',
      '<p class="section-intro">' + (isIt ? 'Layout e particellari ricevono solo props coerenti con il loro comportamento. Per Grid Motion, items è il contenuto delle card; rows, columns e gap definiscono la composizione. Grid Distortion funziona senza asset esterni e accetta imageSrc quando vuoi sostituire il visual predefinito.' : 'Layout and particles receive only behavior-relevant props. In Grid Motion, items is card content; rows, columns and gap define composition. Grid Distortion works without external assets and accepts imageSrc when you want to replace the default visual.') + '</p>',
      codeBlock(particleExample),
      '<h2 class="section-title">6. ' + (isIt ? 'Applica un tema' : 'Apply a theme') + '</h2>',
      '<p class="section-intro">' + (isIt ? 'In React usa ThemeProvider; in qualsiasi framework puoi applicare data-ui-theme al contenitore dell’app.' : 'In React use ThemeProvider; in any framework you can apply data-ui-theme to the app container.') + '</p>',
      codeBlock('<main data-ui-theme="light">\n  <!-- your Gozion UI -->\n</main>'),
      '<div class="a11y-note"><strong>' + (isIt ? 'Come usare la documentazione.' : 'How to use the documentation.') + '</strong> ' + (isIt ? 'Per ogni componente: prova i controlli, seleziona React/Vue/Angular, copia lo snippet aggiornato e consulta la tabella API sotto la preview. Gli stili abilitano layout, temi, focus visibile e stati disabled: importali una sola volta a livello app.' : 'For every component: try controls, select React/Vue/Angular, copy the updated snippet, and consult the API table below the preview. Styles enable layout, themes, visible focus, and disabled states: import them once at app level.') + '</div>'
    ].join('');
  }
  function renderStudio() {
    const isIt = state.locale === 'it';
    const palettes = {
      dark: ['#928cff','#47c5c8','#0d0f14','#151820','#f4f5f8','#2d3340'],
      light: ['#6e5c84','#5c8580','#f6f1e8','#fffaf3','#29251f','#ded4c7']
    };
    const previewTheme = 'dark';
    const controls = ['primary','secondary','background','surface','foreground','border-color'].map((name,index) => [name,palettes[previewTheme][index]]);
    main.innerHTML = `<p class="eyebrow">${isIt ? 'THEME STUDIO' : 'THEME STUDIO'}</p>
      <h1 class="page-title">${isIt ? 'Progetta i token, non la documentazione.' : 'Design tokens, not the documentation.'}</h1>
      <p class="page-intro">${isIt ? 'Questa pagina modifica solo il canvas qui sotto: il sito resta sempre in Dark. Regola i token, verifica stati e contrasto, poi copia il blocco CSS pronto per la tua app.' : 'This page changes only the canvas below: the documentation always stays Dark. Tune tokens, verify states and contrast, then copy the CSS block for your app.'}</p>
      <div class="studio">
        <aside class="studio-controls">
          <div class="studio-explainer"><strong>${isIt ? 'Come usarlo' : 'How to use it'}</strong><p>${isIt ? 'Scegli la superficie da simulare e modifica i token. Le modifiche sono isolate, reversibili e non alterano l’interfaccia della docs.' : 'Choose a surface to simulate and edit its tokens. Changes are isolated, reversible, and never affect the docs interface.'}</p></div>
          <div class="studio-control studio-mode"><label for="studio-canvas-theme">${isIt ? 'Tema del canvas' : 'Canvas theme'}</label><select id="studio-canvas-theme"><option value="dark">Dark</option><option value="light">Light</option></select><small>${isIt ? 'Applica la base scelta solo alla preview.' : 'Applies the selected base only to the preview.'}</small></div>
          <h3>${isIt ? 'Colori semantici' : 'Semantic colors'}</h3>
          ${controls.map(([name,value]) => `<div class="studio-control"><label>${title(name)}</label><input type="color" data-token="${name}" value="${value}"></div>`).join('')}
          <h3>${isIt ? 'Forma e movimento' : 'Shape and motion'}</h3>
          <div class="studio-control"><label>Radius <output>10px</output></label><input type="range" data-token="radius" min="0" max="24" value="10"></div>
          <div class="studio-control"><label>Shadow <output>18px</output></label><input type="range" data-token="shadow" min="0" max="40" value="18"></div>
          <div class="studio-control"><label>Motion <output>160ms</output></label><input type="range" data-token="motion" min="0" max="500" step="20" value="160"></div>
        </aside>
        <section class="studio-preview">
          <div class="studio-preview-heading"><div><p class="eyebrow">${isIt ? 'ANTEPRIMA ISOLATA' : 'ISOLATED PREVIEW'}</p><h2>${isIt ? 'Il tuo tema in uso' : 'Your theme in use'}</h2></div><span>${isIt ? 'Non modifica le docs' : 'Does not change the docs'}</span></div>
          <div class="studio-canvas gozion-preview" id="studio-canvas" data-ui-theme="dark">${componentPreview('Navbar')}${componentPreview('Card')}${componentPreview('Input')}${componentPreview('Switch')}<div class="studio-row">${componentPreview('Button')}${componentPreview('Badge')}</div></div>
          <div class="studio-export"><div><p class="eyebrow">CSS TOKENS</p><h2>${isIt ? 'Pronto da copiare' : 'Ready to copy'}</h2></div><button class="docs-button" type="button" data-copy-studio>${isIt ? 'Copia CSS' : 'Copy CSS'}</button></div>
          <pre class="code-block css-export" id="css-output"></pre>
        </section>
      </div>`;
    const canvas = $('#studio-canvas');
    const update = () => {
      const get = key => $(`[data-token="${key}"]`, main).value;
      const values = {'--ui-primary':get('primary'),'--ui-secondary':get('secondary'),'--ui-background':get('background'),'--ui-surface':get('surface'),'--ui-foreground':get('foreground'),'--ui-border-color':get('border-color'),'--ui-radius':get('radius')+'px','--ui-shadow':`0 12px ${get('shadow')}px rgb(20 24 38 / .16)`,'--ui-transition-duration':get('motion')+'ms'};
      Object.entries(values).forEach(([key,value]) => canvas.style.setProperty(key,value));
      $$('input[type=range]',main).forEach(input => input.previousElementSibling.querySelector('output').textContent = input.value + (input.dataset.token === 'motion' ? 'ms' : 'px'));
      $('#css-output').textContent = '.gozion-preview {\n'+Object.entries(values).map(([key,value]) => `  ${key}: ${value};`).join('\n')+'\n}';
    };
    $$('[data-token]', main).forEach(control => control.addEventListener('input', update));
    $('#studio-canvas-theme').addEventListener('change', event => {
      const palette = palettes[event.target.value];
      canvas.dataset.uiTheme = event.target.value;
      controls.forEach(([name], index) => $(`[data-token="${name}"]`, main).value = palette[index]);
      update();
    });
    $('[data-copy-studio]').addEventListener('click', event => { navigator.clipboard.writeText($('#css-output').textContent); event.currentTarget.textContent = isIt ? 'Copiato' : 'Copied'; setTimeout(() => event.currentTarget.textContent = isIt ? 'Copia CSS' : 'Copy CSS', 1200); });
    update();
  }
  function applyLocale() {
    root.lang = state.locale; $('#locale-select').value = state.locale; $('[data-i18n="search"]').textContent = t('search'); $('#search-input').placeholder = `${t('search')}…`; renderSidebar(); route(false);
  }
  function route(scroll = true) {
    const path = location.hash.slice(2) || 'getting-started';
    clearBackgroundPreviews();
    $$('.side-link').forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#/'+path));
    if (path === 'getting-started') renderHome(); else if (path === 'components') renderCatalogue(); else if (path === 'particles') renderParticleGallery(); else if (path === 'playground') renderStudio(); else if (path === 'installation') renderInstallation(); else { const item = findComponent(path.replace(/^particles\//,'').replace('components/','')); item ? renderComponent(item) : renderHome(); }
    if (scroll) window.scrollTo({top:0}); $('#sidebar').classList.remove('open');
  }
  function runAction(target, event) {
    const preview = target.closest('[data-preview]'); if (!preview) return;
    const action = target.dataset.action;
    if (action === 'increment' || action === 'decrement') { const output = $('[data-number]',preview); output.textContent = Math.max(0, Number(output.textContent) + (action === 'increment' ? 1 : -1)); }
    if (action === 'password') { const input = $('[data-password]',preview); input.type = input.type === 'password' ? 'text' : 'password'; target.textContent = input.type === 'password' ? 'Show' : 'Hide'; }
    if (action === 'upload') $('[data-upload-label]',preview).textContent = state.locale === 'it' ? 'brand-assets.zip selezionato' : 'brand-assets.zip selected';
    if (action === 'toggle') target.classList.toggle('active');
    if (action === 'card-menu') $('[data-card-menu]',preview).hidden = !$('[data-card-menu]',preview).hidden;
    if (action === 'dialog') { const overlay = $('[data-overlay]',preview); if (overlay) overlay.hidden = false; }
    if (action === 'close-overlay') target.closest('[data-overlay]').hidden = true;
    if (action === 'popover') $('[data-popover]',preview).hidden = !$('[data-popover]',preview).hidden;
    if (action === 'menu') $('[data-menu]',preview).hidden = !$('[data-menu]',preview).hidden;
    if (action === 'context' && event.type === 'contextmenu') { event.preventDefault(); $('[data-context]',preview).hidden = false; }
    if (action === 'toast') { const toast = $('[data-toast]',preview); toast.hidden = false; clearTimeout(toast.timer); toast.timer = setTimeout(() => toast.hidden = true, 3500); }
    if (action === 'close-toast') $('[data-toast]',preview).hidden = true;
    if (action === 'collapse') $('[data-collapse]',preview).hidden = !$('[data-collapse]',preview).hidden;
  }
  document.addEventListener('click', event => {
    const backdrop = event.target.closest?.('[data-overlay]');
    if (backdrop && event.target === backdrop) { backdrop.hidden = true; return; }
    $$('.pv-popover [data-popover]:not([hidden])').forEach(panel => { if (!panel.closest('.pv-popover').contains(event.target)) panel.hidden = true; });
    $$('.pv-menu [data-menu]:not([hidden])').forEach(panel => { if (!panel.closest('.pv-menu').contains(event.target)) panel.hidden = true; });
    $$('.pv-context [data-context]:not([hidden])').forEach(panel => { if (!panel.closest('.pv-context').contains(event.target)) panel.hidden = true; });
    $$('.pv-card-menu:not([hidden])').forEach(panel => { if (!panel.closest('.pv-card').contains(event.target)) panel.hidden = true; });
    const componentLink = event.target.closest('[data-component-link]'); if (componentLink && !event.target.closest('button,input,select,a')) { location.hash = '#/'+componentLink.dataset.componentLink; return; }
    const framework = event.target.closest('[data-framework]'); if (framework) {
      state.framework = framework.dataset.framework;
      $$('[data-framework]').forEach(tab => tab.classList.toggle('active', tab === framework));
      const path = location.hash.split('/').pop(), item = findComponent(path);
      if (state.framework === 'Preview') $('#framework-content').innerHTML = `<div class="preview-note">${state.locale === 'it' ? 'Interagisci direttamente con il componente qui sopra.' : 'Interact directly with the component above.'}</div>`;
      else if (item) {
        const particleControl = $('[data-particle-option]');
        if (particleControl) particleControl.dispatchEvent(new Event('input', {bubbles:true})); else syncFrameworkCode(item);
      }
      return;
    }
    const copyCode = event.target.closest('[data-copy-code]'); if (copyCode) { navigator.clipboard.writeText(copyCode.parentElement.querySelector('code').innerText); copyCode.textContent = t('copied'); setTimeout(() => copyCode.textContent = t('copy'),1200); return; }
    const copyValue = event.target.closest('[data-copy-value]'); if (copyValue) { navigator.clipboard.writeText(copyValue.dataset.copyValue); copyValue.textContent = t('copied'); return; }
    const star = event.target.closest('[data-star]'); if (star) { const rating = Number(star.dataset.star); $$('[data-star]',star.parentElement).forEach(button => button.classList.toggle('on',Number(button.dataset.star)<=rating)); $('output',star.parentElement).textContent = rating+'.0'; return; }
    const segment = event.target.closest('.pv-segment button,.pv-tabs button,.pv-toggle-group button'); if (segment) { $$('button',segment.parentElement).forEach(button => { button.classList.remove('active'); if (button.matches('[data-toggle-value], [data-segment-value]')) button.setAttribute('aria-checked','false'); }); segment.classList.add('active'); if (segment.matches('[data-toggle-value], [data-segment-value]')) segment.setAttribute('aria-checked','true'); const control = $('[data-option="value"]'); if (control && segment.dataset.segmentValue) control.value = segment.dataset.segmentValue; const item = findComponent(location.hash.split('/').pop()); if (item) syncFrameworkCode(item); return; }
    const action = event.target.closest('[data-action]'); if (action) { if (!action.closest('[data-preview]') && action.dataset.action === 'dialog') { const trigger = $('#component-preview [data-action="dialog"]'); if (trigger) runAction(trigger,event); } else runAction(action,event); }
  });
  document.addEventListener('contextmenu', event => { const target = event.target.closest('[data-action="context"]'); if (target) runAction(target,event); });
  document.addEventListener('input', event => { if (!event.target.matches('#component-preview [data-slider]')) return; event.target.closest('.pv-slider').querySelector('output').textContent = event.target.value+'%'; const item = findComponent(location.hash.split('/').pop()); if (item) syncFrameworkCode(item); });
  document.addEventListener('input', event => { if (!event.target.matches('#component-preview [data-range-min],[data-range-max]')) return; const range = event.target.closest('.pv-range-slider'), min = $('[data-range-min]', range), max = $('[data-range-max]', range); if (Number(min.value) > Number(max.value)) { if (event.target === min) min.value = max.value; else max.value = min.value; } range.style.setProperty('--range-start', min.value+'%'); range.style.setProperty('--range-end', max.value+'%'); range.closest('.pv-slider').querySelector('output').textContent = `€${min.value} — €${max.value}`; const item = findComponent(location.hash.split('/').pop()); if (item) syncFrameworkCode(item); });
  document.addEventListener('change', event => { if (!event.target.matches('#component-preview [data-switch],[data-checkbox],[data-radio],[data-radio-group],[data-select]')) return; const item = findComponent(location.hash.split('/').pop()); if (item) syncFrameworkCode(item); });
  document.addEventListener('keydown', event => { const toggle = event.target.closest?.('.pv-toggle-group [data-toggle-value]'); if (toggle && ['ArrowLeft','ArrowUp','ArrowRight','ArrowDown','Home','End'].includes(event.key)) { event.preventDefault(); const options = $$('[data-toggle-value]', toggle.parentElement); const current = options.indexOf(toggle); const next = event.key === 'Home' ? options[0] : event.key === 'End' ? options.at(-1) : options[(current + (event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1) + options.length) % options.length]; next.focus(); next.click(); return; } const card = event.target.closest?.('[data-component-link]'); if (card && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); location.hash = '#/'+card.dataset.componentLink; } });
  const dialog = $('#search-dialog'), searchInput = $('#search-input'), results = $('#search-results');
  function search(value = '') { const found = items.filter(item => (item.name+item.category+description(item)).toLowerCase().includes(value.toLowerCase())).slice(0,14); results.innerHTML = found.length ? found.map(item => `<a class="search-item" href="#/components/${slug(item.name)}"><strong>${title(item.name)}</strong><small>${item.category} · ${description(item)}</small></a>`).join('') : `<p class="empty-search">${state.locale === 'it' ? 'Nessun componente trovato.' : 'No components found.'}</p>`; }
  $('#search-trigger').addEventListener('click',() => { dialog.showModal(); searchInput.value=''; search(); searchInput.focus(); }); searchInput.addEventListener('input', event => search(event.target.value)); dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  $('#locale-select').addEventListener('change', event => { state.locale = event.target.value; localStorage.setItem('gozion-locale',state.locale); applyLocale(); });
  $('#menu-toggle').addEventListener('click',() => $('#sidebar').classList.toggle('open'));
  document.addEventListener('keydown', event => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); $('#search-trigger').click(); } if (event.key === 'Escape') { if (dialog.open) dialog.close(); $$('[data-overlay],[data-popover],[data-menu],[data-context],.pv-card-menu').forEach(panel => panel.hidden = true); } });
  addEventListener('hashchange', () => route()); root.dataset.uiTheme = 'dark'; applyLocale();
})();
