import React from 'react';
import { THEMES } from '~/constant';
import { BeakerIcon } from '@heroicons/react/24/outline';

const ThemeSwitcher = () => {
	return (
		<div className="fixed top-2 right-2 dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost rounded-btn flex items-center px-2 rounded-sm"
      >
				<span className="flex items-end">
					<BeakerIcon className="h-6 w-6 text-base-content" />
				</span>
      </label>
			<ul
				tabIndex={0}
				className="dropdown-content menu text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] w-28 overflow-y-auto mt-12 z-50"
			>
				<div className="grid grid-cols-1 gap-2 p-3">
					{THEMES.map(theme => {
						return (
							<div
								key={theme.value}
								className="outline-base-content overflow-hidden rounded-sm outline outline-2 outline-offset-2"
								data-set-theme={theme.value}
								data-act-class="outline"
							>
								<div
									data-theme={theme.value}
									className="bg-base-100/10 w-full cursor-pointer"
								>
									<div className="grid grid-cols-5 grid-rows-3">
										<div className="col-span-5 row-span-3 row-start-1 flex justify-center gap-1 py-3 px-4">
											<div className="flex flex-shrink-0 flex-wrap gap-1 min-h-6">
												<div className="bg-primary w-2 rounded" />
												<div className="bg-secondary w-2 rounded" />
												<div className="bg-accent w-2 rounded" />
												<div className="bg-neutral w-2 rounded" />
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</ul>
		</div>
	);
};

export default ThemeSwitcher;
