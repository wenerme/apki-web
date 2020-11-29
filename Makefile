SHELL=/bin/bash

lint:
	npx eslint src --ext .ts,.tsx

git-hooks:
	echo -e '#!/usr/bin/env bash\nmake pre-commit' > .git/hooks/pre-commit
	chmod +x .git/hooks/pre-commit
	git config pull.rebase true

pre-commit: fix verify

fix:
	npx prettier -w src --loglevel warn
	npx eslint src --fix --ext .ts,.tsx
verify:
	npx tsc --noEmit
